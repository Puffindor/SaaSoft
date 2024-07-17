export default interface listItem {
  id: number;
  login: string;
  password: string | null;
  type: string;
  marks: string[];
}
