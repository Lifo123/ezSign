
const getFetch = async (url: string, options: any) => {
    const response = await fetch(url, options);
    return response.json();
};


const ONLINE = {
    fetch,
}