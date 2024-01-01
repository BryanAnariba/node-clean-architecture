import { CategoryModel } from "../../data";
import { CategoryEntity, CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService {
  
  public async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const category = await CategoryModel.findOne({name: createCategoryDto.name});
    if (category) throw CustomError.badRequest('Category already exists!');

    try {
      const newCategory = await CategoryModel.create({
        ...createCategoryDto,
        user: user.id
      });
      await newCategory.save();
      return {
        id: newCategory.id,
        name: newCategory.name,
        avaliable: newCategory.avaliable
      };
    } catch (error) {
      throw CustomError.internalServerRequest(`Internal Server Error: ${error}`);
    }
  }

  public async getCategories(paginationDto: PaginationDto) {
    try {
      // const categories = (await CategoryModel.find({deletedAt: null}).skip((paginationDto.page - 1) * paginationDto.limit).limit(paginationDto.limit))
      //   .map((category) => CategoryEntity.fromObject(category));
      // const total = await CategoryModel.countDocuments({deletedAt: null});

      const [totalCategories, categories] = await Promise.all(
        [
          CategoryModel.countDocuments({deletedAt: null}),
          CategoryModel
            .find({deletedAt: null})
            .skip((paginationDto.page - 1) * paginationDto.limit)
            .limit(paginationDto.limit)
            .populate('user', 'name email')
        ]
      );

      return {
        page: paginationDto.page,
        limit: paginationDto.limit,
        totalCategories: totalCategories,
        next:  `/api/categories?page=${paginationDto.page+1}&limit=${paginationDto.limit}`,
        previus:  (paginationDto.page - 1 > 0) ? `/api/categories?page=${paginationDto.page-1}&limit=${paginationDto.limit}` : null,
        categories: categories,
      }
    } catch (error) {
      throw CustomError.internalServerRequest(`Internal Server Error: ${error}`);
    }
  }

  public async getCategory() {

  }

  public async updateCategory() {

  }
}