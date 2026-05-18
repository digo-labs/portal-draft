import type { WPEntry } from '../db';

export type { WPEntry };

export type UserRole = 'admin' | 'member' | 'freelancer';
export type Department = 'Creative' | 'Production' | 'Tech' | 'Management';
export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'archived';
export type SkillStatus = 'active' | 'coming_soon';
export type FeedbackCategory = 'bug' | 'feature' | 'idea' | 'other';
export type ResourceType = 'dropbox' | 'drive' | 'figma' | 'notion' | 'other';

export interface User {
  id:          string;
  name:        string;
  email:       string;
  role:        UserRole;
  department:  Department;
  title:       string;
  phone:       string;
  slack:       string;
  avatarColor: string;
  skills:      string[];
  joinedAt:    string;
}

export interface Project {
  id:          string;
  name:        string;
  client:      string;
  status:      ProjectStatus;
  coverColor:  string;
  startDate:   string;
  endDate:     string;
  description: string;
  type:        string;
}

export interface ProjectMember {
  id:        string;
  projectId: string;
  userId:    string;
  role:      string;
}

export interface Milestone {
  id:        string;
  projectId: string;
  title:     string;
  date:      string;
  completed: boolean;
}

export interface ResourceLink {
  id:        string;
  projectId: string;
  label:     string;
  url:       string;
  type:      ResourceType;
}

export interface WPSubmission {
  id:          string;
  userId:      string;
  weekOf:      string;
  entries:     WPEntry[];
  submittedAt: string;
}

export interface Reference {
  id:          string;
  imageColor:  string;
  imageUrl:    string | null;
  height:      number;
  uploader:    string;
  projectId:   string | null;
  tags:        string[];
  description: string;
  createdAt:   string;
}

export interface Collection {
  id:          string;
  name:        string;
  description: string;
  projectId:   string | null;
  createdBy:   string;
}

export interface CollectionReference {
  id:           string;
  collectionId: string;
  referenceId:  string;
}

export interface Announcement {
  id:        string;
  title:     string;
  body:      string;
  image:     string | null;
  authorId:  string;
  createdAt: string;
}

export interface Skill {
  id:          string;
  name:        string;
  slug:        string;
  description: string;
  icon:        string;
  status:      SkillStatus;
}

export interface Feedback {
  id:          string;
  category:    FeedbackCategory;
  title:       string;
  description: string;
  submittedBy: string;
  createdAt:   string;
}
