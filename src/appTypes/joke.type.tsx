type JokeFlags =
  | 'nsfw'
  | 'religious'
  | 'political'
  | 'racist'
  | 'sexist'
  | 'explicit';

export type JokeInterface = {
  id: number;
  type: string;
  joke: string;
  flags: Record<JokeFlags, boolean>;
  safe: boolean;
  lang: string;
};
