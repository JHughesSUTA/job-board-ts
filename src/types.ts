export type Company = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
};

export type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: Company;
};

export type NewJob = Omit<Job, "id">;
