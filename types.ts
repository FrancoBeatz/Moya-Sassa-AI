export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isAudio?: boolean;
}

export enum AppTab {
  CHAT = 'chat',
  STATUS = 'status',
  INFO = 'info'
}

export interface GrantInfo {
  title: string;
  description: string;
  icon: string;
}

export interface StatusResult {
  month: string;
  status: 'Approved' | 'Pending' | 'Declined';
  payDate?: string;
  reason?: string;
}