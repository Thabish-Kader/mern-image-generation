import FileSaver from "file-saver";
export const downloadImage = async (_id: string, photo: string) => {
	FileSaver.saveAs(photo, `download-${_id}.jpeg`);
};
