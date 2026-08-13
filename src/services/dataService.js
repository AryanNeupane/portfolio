import { db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { SEED_PROJECTS, SEED_BLOG_POSTS } from '../data/seedData';

// Local fallback keys. Used when Firebase is not configured, so the site and
// the admin UI stay usable during development and preview.
const STORAGE_PROJECTS_KEY = 'aryan_portfolio_projects';
const STORAGE_BLOG_KEY = 'aryan_portfolio_blog';
const STORAGE_MESSAGES_KEY = 'aryan_portfolio_messages';

const readLocal = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Local storage write failed:', error.message);
  }
};

const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_PROJECTS_KEY)) writeLocal(STORAGE_PROJECTS_KEY, SEED_PROJECTS);
  if (!localStorage.getItem(STORAGE_BLOG_KEY)) writeLocal(STORAGE_BLOG_KEY, SEED_BLOG_POSTS);
  if (!localStorage.getItem(STORAGE_MESSAGES_KEY)) writeLocal(STORAGE_MESSAGES_KEY, []);
};

initLocalStorage();

const sortByDate = (items, field) =>
  [...items].sort((a, b) => String(b[field] || '').localeCompare(String(a[field] || '')));

// ==========================================================================
// PROJECTS
// ==========================================================================
export const getProjects = async (includeUnpublished = false) => {
  try {
    if (db) {
      const q = includeUnpublished
        ? query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
        : query(collection(db, 'projects'), where('published', '==', true), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    }
  } catch (error) {
    console.warn('Firestore project query failed, using local content:', error.message);
  }

  const stored = sortByDate(readLocal(STORAGE_PROJECTS_KEY), 'createdAt');
  return includeUnpublished ? stored : stored.filter((p) => p.published);
};

export const getProjectBySlug = async (slug) => {
  try {
    if (db) {
      const q = query(collection(db, 'projects'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    }
  } catch (error) {
    console.warn('Firestore project slug query failed:', error.message);
  }

  return readLocal(STORAGE_PROJECTS_KEY).find((p) => p.slug === slug) || null;
};

export const saveProject = async (projectData) => {
  const isEdit = Boolean(projectData.id);
  const now = new Date().toISOString();

  if (db) {
    if (isEdit) {
      const { id, ...rest } = projectData;
      await updateDoc(doc(db, 'projects', id), { ...rest, updatedAt: serverTimestamp() });
      return id;
    }
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }

  const stored = readLocal(STORAGE_PROJECTS_KEY);
  if (isEdit) {
    writeLocal(
      STORAGE_PROJECTS_KEY,
      stored.map((p) => (p.id === projectData.id ? { ...p, ...projectData, updatedAt: now } : p))
    );
    return projectData.id;
  }
  const newId = 'proj-' + Date.now();
  writeLocal(STORAGE_PROJECTS_KEY, [{ ...projectData, id: newId, createdAt: now, updatedAt: now }, ...stored]);
  return newId;
};

export const deleteProject = async (id) => {
  if (db) {
    await deleteDoc(doc(db, 'projects', id));
    return true;
  }
  writeLocal(
    STORAGE_PROJECTS_KEY,
    readLocal(STORAGE_PROJECTS_KEY).filter((p) => p.id !== id)
  );
  return true;
};

export const setProjectFlag = async (id, field, value) => {
  if (db) {
    await updateDoc(doc(db, 'projects', id), { [field]: value, updatedAt: serverTimestamp() });
    return true;
  }
  writeLocal(
    STORAGE_PROJECTS_KEY,
    readLocal(STORAGE_PROJECTS_KEY).map((p) =>
      p.id === id ? { ...p, [field]: value, updatedAt: new Date().toISOString() } : p
    )
  );
  return true;
};

// ==========================================================================
// BLOG POSTS
// ==========================================================================
export const getBlogPosts = async (includeUnpublished = false) => {
  try {
    if (db) {
      const q = includeUnpublished
        ? query(collection(db, 'blogPosts'), orderBy('publishedAt', 'desc'))
        : query(collection(db, 'blogPosts'), where('published', '==', true), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    }
  } catch (error) {
    console.warn('Firestore blog query failed, using local content:', error.message);
  }

  const stored = sortByDate(readLocal(STORAGE_BLOG_KEY), 'publishedAt');
  return includeUnpublished ? stored : stored.filter((b) => b.published);
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
    console.warn('Firestore blog slug query failed:', error.message);
  }

  return readLocal(STORAGE_BLOG_KEY).find((b) => b.slug === slug) || null;
};

export const saveBlogPost = async (postData) => {
  const isEdit = Boolean(postData.id);
  const now = new Date().toISOString();

  if (db) {
    if (isEdit) {
      const { id, ...rest } = postData;
      await updateDoc(doc(db, 'blogPosts', id), { ...rest, updatedAt: serverTimestamp() });
      return id;
    }
    const docRef = await addDoc(collection(db, 'blogPosts'), {
      ...postData,
      publishedAt: postData.publishedAt || now,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }

  const stored = readLocal(STORAGE_BLOG_KEY);
  if (isEdit) {
    writeLocal(
      STORAGE_BLOG_KEY,
      stored.map((b) => (b.id === postData.id ? { ...b, ...postData, updatedAt: now } : b))
    );
    return postData.id;
  }
  const newId = 'post-' + Date.now();
  writeLocal(STORAGE_BLOG_KEY, [
    { ...postData, id: newId, publishedAt: postData.publishedAt || now, updatedAt: now },
    ...stored,
  ]);
  return newId;
};

export const deleteBlogPost = async (id) => {
  if (db) {
    await deleteDoc(doc(db, 'blogPosts', id));
    return true;
  }
  writeLocal(
    STORAGE_BLOG_KEY,
    readLocal(STORAGE_BLOG_KEY).filter((b) => b.id !== id)
  );
  return true;
};

export const setBlogPostFlag = async (id, field, value) => {
  if (db) {
    await updateDoc(doc(db, 'blogPosts', id), { [field]: value, updatedAt: serverTimestamp() });
    return true;
  }
  writeLocal(
    STORAGE_BLOG_KEY,
    readLocal(STORAGE_BLOG_KEY).map((b) =>
      b.id === id ? { ...b, [field]: value, updatedAt: new Date().toISOString() } : b
    )
  );
  return true;
};

// ==========================================================================
// CONTACT MESSAGES
// ==========================================================================
export const submitContactMessage = async (messageData) => {
  if (db) {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...messageData,
      read: false,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  }

  const stored = readLocal(STORAGE_MESSAGES_KEY);
  const newMsg = { id: 'msg-' + Date.now(), ...messageData, read: false, createdAt: new Date().toISOString() };
  writeLocal(STORAGE_MESSAGES_KEY, [newMsg, ...stored]);
  return { success: true, id: newMsg.id };
};

export const getContactMessages = async () => {
  try {
    if (db) {
      const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (error) {
    console.warn('Firestore message query failed, using local fallback:', error.message);
  }

  return readLocal(STORAGE_MESSAGES_KEY);
};

export const setMessageRead = async (id, read) => {
  if (db) {
    await updateDoc(doc(db, 'contactMessages', id), { read });
    return true;
  }
  writeLocal(
    STORAGE_MESSAGES_KEY,
    readLocal(STORAGE_MESSAGES_KEY).map((m) => (m.id === id ? { ...m, read } : m))
  );
  return true;
};

export const deleteContactMessage = async (id) => {
  if (db) {
    await deleteDoc(doc(db, 'contactMessages', id));
    return true;
  }
  writeLocal(
    STORAGE_MESSAGES_KEY,
    readLocal(STORAGE_MESSAGES_KEY).filter((m) => m.id !== id)
  );
  return true;
};
