declare global {
	namespace NodeJS {
		interface ProcessEnv {
			OPENAI_API_KEY: string;
			MONGO_URL: string;
			CLOUDINARY_CLOUD_NAME: string;
			CLOUDINARY_API_KEY: string;
			CLOUDINARY_API_SERCRET: string;
		}
	}
}
export {};
