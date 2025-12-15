export interface Question {
  id: number;
  text: string;
  isCompleted: boolean;
  category?: 'fun' | 'deep' | 'future' | 'spicy';
}

export interface AIState {
  loading: boolean;
  error?: string;
  generatedQuestion?: string;
}
