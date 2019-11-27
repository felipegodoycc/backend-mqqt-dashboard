import { ApiModelProperty } from '@nestjs/swagger';

class UserData {
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    last_name: string;
}

export class CreateUserDTO {
    @ApiModelProperty()
    username: string;

    @ApiModelProperty()
    password?: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    active?: boolean;

    @ApiModelProperty()
    userdata?: UserData;

}