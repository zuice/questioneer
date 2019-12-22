import { formatDistance } from 'date-fns';

export const formatDate = (updatedAt: number) =>
  formatDistance(new Date(updatedAt), new Date(), { addSuffix: true });
