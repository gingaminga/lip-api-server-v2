import { rdbUtil } from "@loaders/util.loader";
import ToDo from "@my-rdb/entities/to-do.entity";
import { Between, FindOptionsRelations, IsNull } from "typeorm";

export const ToDoRepository = rdbUtil.getRepository(ToDo).extend({
  /**
   *
   * @param startDate 시작 날짜
   * @param endDate 끝 날짜
   * @param userID
   * @param relations 관계형 옵션
   */
  async getToDo(startDate: string, endDate: string, userID: number, relations: FindOptionsRelations<ToDo>) {
    const toDos = await this.find({
      relations,
      where: {
        date: Between(startDate, endDate),
        user: {
          id: userID,
        },
      },
      order: {
        date: "ASC",
      },
    });

    return toDos;
  },
  /**
   * @description 할 일 내용 수정하기
   * @param toDoID
   * @param content 내용
   * @param userID
   * @returns true (수정) / false (수정 실패)
   */
  async modifyContent(toDoID: number, content: string, userID: number) {
    const result = await this.update(
      {
        deletedAt: IsNull(),
        id: toDoID,
        user: {
          id: userID,
        },
      },
      {
        content,
      },
    );

    if (result.affected && result.affected > 0) {
      return true;
    }

    return false;
  },
  /**
   * @description 할 일 메모 수정하기
   * @param toDoID
   * @param memo 메모 내용
   * @param userID
   * @returns true (수정) / false (수정 실패)
   */
  async modifyMemo(toDoID: number, memo: string, userID: number) {
    const result = await this.update(
      {
        deletedAt: IsNull(),
        id: toDoID,
        user: {
          id: userID,
        },
      },
      {
        memo,
      },
    );

    if (result.affected && result.affected > 0) {
      return true;
    }

    return false;
  },
  /**
   * @description 할 일 완료 여부 수정하기
   * @param toDoID
   * @param isChecked 완료 여부
   * @param userID
   * @returns true (수정) / false (수정 실패)
   */
  async modifyChecked(toDoID: number, isChecked: boolean, userID: number) {
    const result = await this.update(
      {
        deletedAt: IsNull(),
        id: toDoID,
        user: {
          id: userID,
        },
      },
      {
        checked: isChecked ? "Y" : "N",
      },
    );

    if (result.affected && result.affected > 0) {
      return true;
    }

    return false;
  },
  /**
   * @description 할 일 삭제하기
   * @param toDoID
   * @param userID
   * @returns true (삭제) / false (삭제 실패)
   */
  async remove(toDoID: number, userID: number) {
    const result = await this.softDelete({
      id: toDoID,
      user: {
        id: userID,
      },
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    return false;
  },
});
