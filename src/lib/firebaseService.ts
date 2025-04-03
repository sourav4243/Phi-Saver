import { db } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs, increment } from 'firebase/firestore';
import { User, Achievement, Badge, Pet, PetType } from './types';

// User Operations
export const createUser = async (userId: string, userData: Partial<User>) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...userData,
    streak: 0,
    savings: 0,
    level: 1,
    xp: 0,
    friends: [],
    achievements: [],
    badges: [],
    pets: [],
    createdAt: new Date(),
    lastLogin: new Date()
  });
};

export const getUser = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() as User : null;
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...updates,
    lastLogin: new Date()
  });
};

// Friends Operations
export const addFriend = async (userId: string, friendId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    friends: increment(1)
  });
};

// Achievement Operations
export const addAchievement = async (userId: string, achievement: Achievement) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    achievements: increment(1)
  });
};

// Pet Operations
export const addPet = async (userId: string, pet: Pet) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    pets: increment(1)
  });
};

export const updatePet = async (userId: string, petId: string, updates: Partial<Pet>) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const user = userSnap.data() as User;
    const updatedPets = user.pets.map(pet => 
      pet.id === petId ? { ...pet, ...updates } : pet
    );
    await updateDoc(userRef, { pets: updatedPets });
  }
};

// Leaderboard Operations
export const getLeaderboard = async (limit: number = 10) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('level', '>', 0));
  const querySnapshot = await getDocs(q);
  
  const users = querySnapshot.docs.map(doc => doc.data() as User);
  return users
    .sort((a, b) => b.level - a.level || b.xp - a.xp)
    .slice(0, limit);
}; 