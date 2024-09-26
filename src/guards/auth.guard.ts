import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate{
  private readonly logger = new Logger(AuthGuard.name)
    
  constructor(
    private readonly jwtService: JwtService
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if(!token) throw new UnauthorizedException("Token is missing in headers, but is required in route.")

    try{
  
      const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET})

      request["user"] = payload

    }catch(err){
      this.logger.error(err)
      return false
    }

    return true
  }


  private extractTokenFromHeader(req:Request) {
    const [type, token] = req.headers.authorization?.split(" ") || []

    return type === 'Bearer' ? token : undefined
  }
}
