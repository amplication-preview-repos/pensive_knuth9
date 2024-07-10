/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { DrugService } from "../drug.service";
import { DrugCreateInput } from "./DrugCreateInput";
import { Drug } from "./Drug";
import { DrugFindManyArgs } from "./DrugFindManyArgs";
import { DrugWhereUniqueInput } from "./DrugWhereUniqueInput";
import { DrugUpdateInput } from "./DrugUpdateInput";

export class DrugControllerBase {
  constructor(protected readonly service: DrugService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Drug })
  async createDrug(@common.Body() data: DrugCreateInput): Promise<Drug> {
    return await this.service.createDrug({
      data: data,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Drug] })
  @ApiNestedQuery(DrugFindManyArgs)
  async drugs(@common.Req() request: Request): Promise<Drug[]> {
    const args = plainToClass(DrugFindManyArgs, request.query);
    return this.service.drugs({
      ...args,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Drug })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async drug(
    @common.Param() params: DrugWhereUniqueInput
  ): Promise<Drug | null> {
    const result = await this.service.drug({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Drug })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateDrug(
    @common.Param() params: DrugWhereUniqueInput,
    @common.Body() data: DrugUpdateInput
  ): Promise<Drug | null> {
    try {
      return await this.service.updateDrug({
        where: params,
        data: data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Drug })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteDrug(
    @common.Param() params: DrugWhereUniqueInput
  ): Promise<Drug | null> {
    try {
      return await this.service.deleteDrug({
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
