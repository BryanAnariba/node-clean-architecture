import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {

  constructor() {}

  public async createProduct (createProductDto: CreateProductDto) {
    const product = await ProductModel.findOne({name: createProductDto.name});
    if (product) throw CustomError.badRequest('Product Already Exists!');

    try {
      const newProduct = await ProductModel.create(createProductDto);
      return newProduct.save();
    } catch (error) {
      throw CustomError.internalServerRequest(`Internal Server Error: ${error}`)
    }
  }

  public async getProducts (paginationDto: PaginationDto) {
    const [totalProducts, products] = await Promise.all(
      [
        ProductModel.countDocuments({deletedAt: null}),
        ProductModel
          .find({deletedAt: null})
          .skip((paginationDto.page)-1)
          .limit(paginationDto.limit)
          .populate('user', 'name email')
          .populate('category','name')
      ]
    );
    return {
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalProducts: totalProducts,
      next: `/api/products?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      previus: (paginationDto.page - 1 > 0) ? `/api/products?page${paginationDto.page-1}` : null,
      products: products,
    }
  }
}