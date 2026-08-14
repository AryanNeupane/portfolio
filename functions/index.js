const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.submitContactMessage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const sanitizedIp = ip.replace(/\./g, '_').replace(/:/g, '_'); // Safe for Firestore doc ID
    
    if (sanitizedIp === 'unknown') {
      return res.status(400).json({ error: 'IP address required for rate limiting' });
    }

    const rateLimitRef = db.collection('rateLimits').doc(sanitizedIp);
    const now = admin.firestore.Timestamp.now();

    try {
      await db.runTransaction(async (t) => {
        const doc = await t.get(rateLimitRef);
        let data = doc.data();

        if (data) {
          const blockUntil = data.blockUntil;
          
          if (blockUntil && blockUntil.toDate() > now.toDate()) {
             // Currently blocked
             throw new Error('RATE_LIMIT_EXCEEDED');
          }

          // Reset if it's a new day since first request?
          // The prompt says "a maximum of 5 contact forms per day. On the 6th attempt, block that IP address from submitting the contact form for 24 hours."
          // If they aren't blocked, but 24 hours have passed since firstRequestAt, we reset their count.
          const oneDayAgo = new Date(now.toDate().getTime() - 24 * 60 * 60 * 1000);
          
          if (data.firstRequestAt && data.firstRequestAt.toDate() < oneDayAgo && (!blockUntil || blockUntil.toDate() <= now.toDate())) {
            // Reset count
            data.count = 1;
            data.firstRequestAt = now;
            data.blockUntil = null;
          } else {
            data.count = (data.count || 0) + 1;
            
            if (data.count > 5) {
               data.blockUntil = admin.firestore.Timestamp.fromDate(new Date(now.toDate().getTime() + 24 * 60 * 60 * 1000));
               t.set(rateLimitRef, data);
               throw new Error('RATE_LIMIT_EXCEEDED');
            }
          }
        } else {
          data = {
            count: 1,
            firstRequestAt: now,
            blockUntil: null
          };
        }
        
        t.set(rateLimitRef, data);
      });
      
      // Save message to contactMessages collection
      const messageData = req.body;
      
      // Validate basic payload
      if (!messageData.name || !messageData.email || !messageData.message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      messageData.createdAt = now;
      messageData.read = false;
      
      const docRef = await db.collection('contactMessages').add(messageData);
      
      return res.status(200).json({ success: true, id: docRef.id });

    } catch (error) {
      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        return res.status(429).json({ error: 'Too many contact form submissions. Please try again after 24 hours.' });
      }
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});
