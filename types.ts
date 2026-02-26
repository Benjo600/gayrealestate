export interface Agent {
  id: string;
  name: string;
  location: string;
  state: string;
  specialties: string[];
  rating: number;
  reviews: number;
  imageUrl: string;
  bio: string;
  yearsExperience: number;
  verified: boolean;
}

export interface SearchCriteria {
  location: string;
  buyOrSell: 'buy' | 'sell' | 'both';
  propertyType?: string;
  budget?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AgentMatchResponse {
  suggestedLocation?: string;
  intent?: 'buy' | 'sell' | 'invest';
  keyFeatures?: string[];
  reasoning: string;
}
