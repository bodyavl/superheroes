export interface ISuperhero {
  id: number;
  nickname: string;
  pictureId: number;
}

export interface ISuperheroDetails {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  pictures: Picture[];
}

export interface Picture {
  id: number;
}

export interface Pagination<T> {
  items: T[];
  meta: Meta;
}

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
