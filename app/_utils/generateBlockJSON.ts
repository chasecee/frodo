export const generateBlockJSON = (blockName: string, generation: string) => `
{
    "name": "${blockName}",
    "title": "${blockName}",
    "description": "A custom ${blockName} block.",
    "category": "formatting",
    "icon": "admin-comments",
    "keywords": ["${blockName}"],
    "acf": ${generation}
}
`;
