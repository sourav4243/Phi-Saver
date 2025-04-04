export interface User {
  id: string; // Clerk user ID
  email: string;
  displayName: string;
  streak: number;
  savings: number;
  level: number;
  xp: number;
  friends: string[]; // Array of friend user IDs
  achievements: Achievement[];
  badges: Badge[];
  pets: Pet[];
  createdAt: Date;
  lastLogin: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: Date;
  progress: number;
  totalRequired: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  unlockedAt: Date;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  level: number;
  evolution: number;
  xp: number;
  unlockedAt: Date;
}

export interface PetType {
  id: string;
  name: string;
  baseImageUrl: string;
  evolutions: Evolution[];
  requiredLevel: number;
}

export interface Evolution {
  level: number;
  imageUrl: string;
  name: string;
  description: string;
} 