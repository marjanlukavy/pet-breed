export interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
  temperament?: string;
  reference_image_id: string;
  breed_group: string;
  origin: string;
  description: string;
  affection_level: string;
  child_friendly: string;
  dog_friendly: string;
  energy_level: string;
  bred_for: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: { imperial: string; metric: string };
}

export interface ApiResponse {
  [key: string]: Breed[];
}
