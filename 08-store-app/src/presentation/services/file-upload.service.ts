import path from 'node:path';
import fs from 'node:fs';
import { UploadedFile } from "express-fileupload";
import { CustomError } from '../../domain';
import { UUID } from '../../config';

export class FileUploadService {

  constructor (
    private readonly uuid = UUID.v4
  ) {}

  private checkFolderUpload(folderPath: string) {
    if(!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  public async uploadMultiple (
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtentions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    const fileNames = await Promise.all(
      files.map(
        file => this.uploadSingle(file, folder, validExtentions)
      )
    );

    return fileNames;
  }

  public async uploadSingle (
    file: UploadedFile, 
    folder: string = 'uploads',
    validExtentions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) || '';

      if (!validExtentions.includes(fileExtension)) {
        throw CustomError.badRequest(`Invalid File Extention: ${fileExtension}, valid ones ${validExtentions}`);
      }

      const destination = path.resolve(__dirname, '../../../', folder);
      this.checkFolderUpload(destination);
      const fileName = `${this.uuid()}.${fileExtension}`;
      file.mv(destination+'/'+fileName);

      return {fileName: fileName};
    } catch (error) {
      throw CustomError.internalServerRequest(`Internal Server error: ${error}`);
    }
  }
}