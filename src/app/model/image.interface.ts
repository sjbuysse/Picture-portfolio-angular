export interface Image {
  id: string;
  name: string;
  caption: string;
  url: string;
}

export function createImage(): Image {
  return {
    id: '',
    name: '',
    caption: '',
    url: ''
  };
}
