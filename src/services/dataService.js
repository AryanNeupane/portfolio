import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, serverTimestamp } from 'firebase/firestore';
import { SEED_PROJECTS, SEED_BLOG_POSTS, PERSONAL_PROFILE, SEED_CERTIFICATIONS } from '../data/seedData';

// Storage keys for offline / development fallback
const STORAGE_PROJECTS_KEY = 'aryan_portfolio_projects';
const STORAGE_BLOG_KEY = 'aryan_portfolio_blog';
const STORAGE_MESSAGES_KEY = 'aryan_portfolio_messages';
const STORAGE_CERTIFICATIONS_KEY = 'aryan_portfolio_certifications';
const STORAGE_SETTINGS_KEY = 'aryan_portfolio_settings';

// Helper to initialize local storage if empty
const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_PROJECTS_KEY)) {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_BLOG_KEY)) {
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(SEED_BLOG_POSTS));
  }
  if (!localStorage.getItem(STORAGE_MESSAGES_KEY)) {
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_CERTIFICATIONS_KEY)) {
    localStorage.setItem(STORAGE_CERTIFICATIONS_KEY, JSON.stringify(SEED_CERTIFICATIONS));
  }
  if (!localStorage.getItem(STORAGE_SETTINGS_KEY)) {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(PERSONAL_PROFILE));
  }
};

initLocalStorage();

// ==========================================
// PROJECTS SERVICE
// ==========================================
export const getProjects = async (includeUnpublished = false) => {
  try {
    if (db) {
      const q = includeUnpublished 
        ? query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
        : query(collection(db, 'projects'), where('published', '==', true), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore query failed, using local fallback:", error.message);
  }
  
  // Fallback
  const stored = JSON.parse(localStorage.getItem(STORAGE_PROJECTS_KEY) || '[]');
  return includeUnpublished ? stored : stored.filter(p => p.published);
};

export const getProjectBySlug = async (slug) => {
  try {
    if (db) {
      const q = query(collection(db, 'projects'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        return { id: docData.id, ...docData.data() };
      }
    }
  } catch (error) {
    console.warn("Firestore query failed for project slug:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_PROJECTS_KEY) || '[]');
  return stored.find(p => p.slug === slug) || null;
};

export const saveProject = async (projectData) => {
  const isEdit = Boolean(projectData.id);
  const now = new Date().toISOString();
  
  try {
    if (db) {
      if (isEdit) {
        const ref = doc(db, 'projects', projectData.id);
        await updateDoc(ref, { ...projectData, updatedAt: serverTimestamp() });
        return projectData.id;
      } else {
        const docRef = await addDoc(collection(db, 'projects'), { 
          ...projectData, 
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp() 
        });
        return docRef.id;
      }
    }
  } catch (error) {
    console.warn("Firestore save failed, saving to local fallback:", error.message);
  }

  // Local fallback
  const stored = JSON.parse(localStorage.getItem(STORAGE_PROJECTS_KEY) || '[]');
  if (isEdit) {
    const updated = stored.map(p => p.id === projectData.id ? { ...projectData, updatedAt: now } : p);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
    return projectData.id;
  } else {
    const newId = 'proj-' + Date.now();
    const newProject = { ...projectData, id: newId, createdAt: now, updatedAt: now };
    stored.unshift(newProject);
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(stored));
    return newId;
  }
};

// ==========================================
// BLOG SERVICE
// ==========================================
export const getBlogPosts = async (includeUnpublished = false) => {
  try {
    if (db) {
      const q = includeUnpublished
        ? query(collection(db, 'blogPosts'), orderBy('publishedAt', 'desc'))
        : query(collection(db, 'blogPosts'), where('published', '==', true), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore blog query failed, using fallback:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_BLOG_KEY) || '[]');
  return includeUnpublished ? stored : stored.filter(b => b.published);
};

export const getBlogPostBySlug = async (slug) => {
  try {
    if (db) {
      const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    }
  } catch (error) {
    console.warn("Firestore blog slug query failed:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_BLOG_KEY) || '[]');
  return stored.find(b => b.slug === slug) || null;
};

export const saveBlogPost = async (postData) => {
  const isEdit = Boolean(postData.id);
  const now = new Date().toISOString();
  
  try {
    if (db) {
      if (isEdit) {
        const ref = doc(db, 'blogPosts', postData.id);
        await updateDoc(ref, { ...postData, updatedAt: serverTimestamp() });
        return postData.id;
      } else {
        const docRef = await addDoc(collection(db, 'blogPosts'), { 
          ...postData, 
          publishedAt: serverTimestamp(),
          updatedAt: serverTimestamp() 
        });
        return docRef.id;
      }
    }
  } catch (error) {
    console.warn("Firestore blog save failed, using local fallback:", error.message);
  }

  const stored = JSON.parse(localStorage.getItem(STORAGE_BLOG_KEY) || '[]');
  if (isEdit) {
    const updated = stored.map(b => b.id === postData.id ? { ...postData, updatedAt: now } : b);
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(updated));
    return postData.id;
  } else {
    const newId = 'post-' + Date.now();
    const newPost = { ...postData, id: newId, publishedAt: now, updatedAt: now };
    stored.unshift(newPost);
    localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(stored));
    return newId;
  }
};

// ==========================================
// CONTACT MESSAGES SERVICE
// ==========================================
export const submitContactMessage = async (messageData) => {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'portfolio-92c05';
  // Use cloud function endpoint for rate limiting logic instead of direct firestore write
  const endpoint = `https://us-central1-${projectId}.cloudfunctions.net/submitContactMessage`;

  const payload = {
    ...messageData,
    read: false,
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('429: Too many contact form submissions. Please try again after 24 hours.');
      }
      throw new Error(result.error || 'Failed to submit message');
    }
    
    return { success: true, id: result.id };
  } catch (error) {
    if (error.message && error.message.includes('429')) {
      throw error; // Let the UI handle rate limit explicitly
    }
    
    console.warn("Cloud function failed, falling back to local storage if available:", error.message);
    const stored = JSON.parse(localStorage.getItem(STORAGE_MESSAGES_KEY) || '[]');
    const newMsg = { id: 'msg-' + Date.now(), ...payload };
    stored.unshift(newMsg);
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(stored));
    return { success: true, id: newMsg.id };
  }
};

export const getContactMessages = async () => {
  try {
    if (db) {
      const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore contact messages query failed, using local fallback:", error.message);
  }

  return JSON.parse(localStorage.getItem(STORAGE_MESSAGES_KEY) || '[]');
};

// ==========================================
// CERTIFICATIONS SERVICE
// ==========================================
export const getCertifications = async () => {
  try {
    if (db) {
      const q = query(collection(db, 'certifications'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore certifications query failed:", error.message);
  }
  return JSON.parse(localStorage.getItem(STORAGE_CERTIFICATIONS_KEY) || '[]');
};

export const saveCertification = async (certData) => {
  const isEdit = Boolean(certData.id && !certData.id.startsWith('cert-')); // New items locally start with cert-
  try {
    if (db) {
      if (isEdit) {
        const ref = doc(db, 'certifications', certData.id);
        await updateDoc(ref, { ...certData });
        return certData.id;
      } else {
        const docRef = await addDoc(collection(db, 'certifications'), { ...certData });
        return docRef.id;
      }
    }
  } catch (error) {
    console.warn("Firestore certification save failed:", error.message);
  }
  
  const stored = JSON.parse(localStorage.getItem(STORAGE_CERTIFICATIONS_KEY) || '[]');
  if (isEdit) {
    const updated = stored.map(c => c.id === certData.id ? { ...certData } : c);
    localStorage.setItem(STORAGE_CERTIFICATIONS_KEY, JSON.stringify(updated));
    return certData.id;
  } else {
    const newId = 'cert-' + Date.now();
    const newCert = { ...certData, id: newId };
    stored.push(newCert);
    localStorage.setItem(STORAGE_CERTIFICATIONS_KEY, JSON.stringify(stored));
    return newId;
  }
};

export const deleteCertification = async (id) => {
  try {
    if (db && !id.startsWith('cert-')) {
      await deleteDoc(doc(db, 'certifications', id));
    }
  } catch (error) {
    console.warn("Firestore delete failed:", error.message);
  }
  const stored = JSON.parse(localStorage.getItem(STORAGE_CERTIFICATIONS_KEY) || '[]');
  localStorage.setItem(STORAGE_CERTIFICATIONS_KEY, JSON.stringify(stored.filter(c => c.id !== id)));
};

// ==========================================
// SETTINGS SERVICE
// ==========================================
export const getSettings = async () => {
  try {
    if (db) {
      const docRef = doc(db, 'settings', 'profile');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }
    }
  } catch (error) {
    console.warn("Firestore settings query failed:", error.message);
  }
  return JSON.parse(localStorage.getItem(STORAGE_SETTINGS_KEY) || '{}');
};

export const saveSettings = async (settingsData) => {
  try {
    if (db) {
      await updateDoc(doc(db, 'settings', 'profile'), { ...settingsData });
    }
  } catch (error) {
    console.warn("Firestore settings save failed, trying setDoc or local:", error.message);
  }
  localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settingsData));
  return true;
};
