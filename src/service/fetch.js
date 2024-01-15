import fetch from 'cross-fetch';
export const User = async (options, host)=> {
  const url = `https://blog-post-hazel-one.vercel.app/${host}`;
  const requere = await fetch(url, options);
  const response = await requere.json();
  return response;
}

export const Post = async (options, host)=> {
  const url = `https://blog-post-hazel-one.vercel.app/${host}`;
  const requere = await fetch(url, options);
  const response = await requere.json();
  return response;
}