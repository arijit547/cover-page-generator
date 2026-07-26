import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import BorderedTemplate from '../templates/BorderedTemplate';
import RoundedTemplate from '../templates/RoundedTemplate';

export const designs = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Centered layout with serif headings and gold dividers',
    component: ClassicTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean sans-serif layout with vertical accent bar',
    component: ModernTemplate,
  },
  {
    id: 'bordered',
    name: 'Bordered',
    description: 'Ornate double-frame border with seal-style logo',
    component: BorderedTemplate,
  },
  {
    id: 'rounded',
    name: 'Rounded Box',
    description: 'Centered layout with a rounded split-box submission section',
    component: RoundedTemplate,
  },
];

export function getDesignById(id) {
  return designs.find((d) => d.id === id) ?? designs[0];
}
