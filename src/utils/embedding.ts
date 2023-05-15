import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const matches = async (query: string, files: {
    name: string, type: string, size: string, created: string
}[]) => {
    const embedding = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: query
    })
    
    const results = await Promise.all(files.map(async (file) => {
        const fileEmbedding = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: file.name
        })
        const similarity = vectorSimilarity(embedding.data.data[0].embedding, fileEmbedding.data.data[0].embedding)
        return { file, similarity }
    }))

    return results.sort((a, b) => b.similarity - a.similarity)
}

export function vectorSimilarity( x: number[], y: number[] ): number {
	let sum = 0;
	for ( let i = 0; i < x.length; i++ ) {
		sum += x[ i ] * y[ i ];
	}
	return sum;
}