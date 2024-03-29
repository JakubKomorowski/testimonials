import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import post from "./schemas/post";
import page from "./schemas/page";
import author from "./schemas/author";
import { youtube } from "./schemas/youtube";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, page, youtube],
};
