import { PackageStatus, Package } from '../types';

export const statusColor: Record<PackageStatus, string> = {
  transit: '#3b82f6',
  delivered: '#22c55e',
  exception: '#ef4444',
};

export const statusLabel: Record<PackageStatus, string> = {
  transit: '运输中',
  delivered: '已签收',
  exception: '异常',
};

export const statusBg: Record<PackageStatus, string> = {
  transit: 'bg-blue-500',
  delivered: 'bg-green-500',
  exception: 'bg-red-500',
};

export const overdueColor = '#f97316';
export const overdueLabel = '已超时';
export const overdueBg = 'bg-orange-500';

export function isOverdue(pkg: Package): boolean {
  if (pkg.status === 'delivered') return false;
  const now = new Date();
  const [month, day] = pkg.estimatedDelivery.split('/').map(Number);
  const estimated = new Date(now.getFullYear(), month - 1, day);
  estimated.setHours(23, 59, 59, 999);
  return now > estimated;
}

export function getDisplayColor(pkg: Package): string {
  if (isOverdue(pkg)) return overdueColor;
  return statusColor[pkg.status];
}

export function getDisplayBg(pkg: Package): string {
  if (isOverdue(pkg)) return overdueBg;
  return statusBg[pkg.status];
}
