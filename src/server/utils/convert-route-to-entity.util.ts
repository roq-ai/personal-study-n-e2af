const mapping: Record<string, string> = {
  organizations: 'organization',
  'study-notes': 'study_note',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
