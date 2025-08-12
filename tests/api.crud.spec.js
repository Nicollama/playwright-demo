import { test, expect, request } from '@playwright/test';

test('Basic API CRUD', async () => {
  const api = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });

  // GET
  const getRes = await api.get('/posts/1');
  expect(getRes.ok()).toBeTruthy();
  console.log('GET:', await getRes.json());

  // POST
  const postRes = await api.post('/posts', { data: { title: 'foo', body: 'bar', userId: 1 } });
  expect(postRes.status()).toBe(201);
  const postData = await postRes.json();
  console.log('POST:', postData);

  // PUT 
  const putRes = await api.put(`/posts/1`, { data: { id: 1, title: 'updated', body: 'new body', userId: 1 } });
  expect(putRes.ok()).toBeTruthy();
  console.log('PUT:', await putRes.json());

  // DELETE
  const deleteRes = await api.delete(`/posts/1`);
  expect(deleteRes.ok()).toBeTruthy();
  console.log('DELETE Status:', deleteRes.status());

  await api.dispose();
});
