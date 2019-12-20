import { formatDistance } from 'date-fns';

export const formatDate = (updatedAt: string) =>
  formatDistance(new Date(updatedAt), new Date(), { addSuffix: true });
