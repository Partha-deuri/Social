import axios from 'axios'

export async function fetchFeed() {
    const res = await axios.get(`/posts/timeline/65d3923bbf1d9c79d112c88f`);
    return res.data;
}