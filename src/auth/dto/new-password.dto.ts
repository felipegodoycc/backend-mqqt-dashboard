import { ApiModelProperty } from "@nestjs/swagger";

export class NewPasswordDTO {
    @ApiModelProperty()
    password: string;
}