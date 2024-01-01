import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";

export class ProductController {

  constructor (
    private productService: ProductService
  ) {}

  private handleError (error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({error: error.message});
    }
    return res.status(500).json({error: `Internal server error: ${error}`})
  }

  public getAll = (req: Request, res: Response) => {
    const {page=1, limit=10} = req.query;
    const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
    this.productService.getProducts(paginationDto!)
      .then((products) => {
        return res.status(200).json(products);
      })
      .catch((error) => this.handleError(error, res));
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@getOne Product Works'});
  }

  public create = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id
    });
    if (error) return res.status(400).json({error: error});
    this.productService.createProduct(createProductDto!)
      .then((product) => {
        return res.status(201).json(product);
      })
      .catch((error) => this.handleError(error, res));
  }

  public editOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@editOne Product Works'});
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@deleteOne Product Works'});
  }
}
