declare module '*.csv' {
  const content: Record<number, Record<string, string>>;
  export default content;
}
