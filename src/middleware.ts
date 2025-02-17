import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default createMiddleware(routing);

export function middleware(request: NextRequest) {
  console.log(`\n[${new Date().toISOString()}] Requisição Recebida:`);
  console.log(`Método: ${request.method}`);
  console.log(`URL: ${request.url}`);
  console.log(`IP: ${(request as any).ip || "Não disponível"}`);
  console.log(`User Agent: ${request.headers.get("user-agent")}`);
  console.log(`Origem: ${request.headers.get("origin") || "Desconhecida"}`);
  console.log(`Referrer: ${request.headers.get("referer") || "Direto"}`);
  console.log("-".repeat(50));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(pt|en|es|fr)/:path*"],
};
