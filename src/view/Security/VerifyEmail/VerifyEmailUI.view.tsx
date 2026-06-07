import { MailOutlined } from "@ant-design/icons";
import { Button as ButtonAntd, Divider } from "antd";
import { SecurityAuthLayout } from "../components";
import { IconShockAbsorberRow } from "@/assets/icons";
import type { IUseVerifyEmailUIHook } from "./VerifyEmailUI.hook";

export const VerifyEmailView = ({ email, handleNavigateToLogin, isPending }: IUseVerifyEmailUIHook) => {
    return (
        <SecurityAuthLayout title="Verifica tu correo" icon={<MailOutlined style={{ fontSize: 32 }} />}>
            <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-desert-sand text-sm">
                        Hemos enviado un enlace de verificación a:
                    </p>
                    {email && (
                        <span className="text-orange-rally font-semibold text-sm break-all px-2 py-1 bg-orange-rally/10 rounded-lg">
                            {email}
                        </span>
                    )}
                    <p className="text-desert-sand/70 text-xs mt-1 leading-relaxed">
                        Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta. Si no lo encuentras, revisa la carpeta de spam.
                    </p>
                </div>
                <div className="flex flex-col gap-2 w-full pt-2">
                    {/* <Button title="Reenviar correo" onClick={handleResendEmail} loading={isPending} /> */}
                    <Divider />
                    <ButtonAntd type="link" onClick={handleNavigateToLogin} disabled={isPending}>
                        <div className="flex flex-row items-center">
                            <IconShockAbsorberRow className="size-18 text-orange-rally" rotate={-90} />
                            <span className="text-orange-rally">Volver a Iniciar sesión</span>
                        </div>
                    </ButtonAntd>
                </div>
            </div>
        </SecurityAuthLayout>
    );
};
