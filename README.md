# Doutor Agenda

Sistema de gestão para clínicas médicas e consultórios, desenvolvido com tecnologias modernas para simplificar o dia a dia de profissionais de saúde.

![GitHub](https://img.shields.io/github/license/seu-usuario/doutor-agenda)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 📌 Sobre

O Doutor Agenda é uma solução completa para gestão de clínicas médicas que oferece:

- 🏥 **Gestão de Clínicas**: Controle múltiplos consultórios em uma única plataforma
- 👨‍⚕️ **Gestão de Médicos**: Cadastre médicos e gerencie suas agendas
- 📅 **Agendamentos**: Sistema intuitivo de marcação de consultas
- 📊 **Dashboard**: Métricas e relatórios em tempo real
- 💰 **Controle Financeiro**: Acompanhamento de receitas e pagamentos
- 🔒 **Segurança**: Autenticação Google e controle de acesso por perfil

[Ver demonstração](https://demo.doutoragenda.com.br)

## 🌟 Funcionalidades

### Para Clínicas

- ✅ Gestão de múltiplos médicos
- 📊 Dashboard com métricas importantes
- 📅 Agendamento de consultas
- 👥 Cadastro e gestão de pacientes
- 💰 Controle financeiro
- 📈 Relatórios e análises

### Para Médicos

- 📅 Visualização da agenda
- 🕒 Gestão de horários disponíveis
- 📝 Histórico de consultas
- 💼 Gestão de pacientes

### Para Administradores

- 👥 Gestão de usuários
- 🏥 Configurações da clínica
- 💳 Gestão de assinaturas
- 📊 Relatórios administrativos

## 🚀 Tecnologias

- **Frontend:**

  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - React Hook Form
  - Zod

- **Backend:**

  - Next.js API Routes
  - DrizzleORM
  - PostgreSQL
  - Better Auth

- **Integrações:**
  - Stripe (Pagamentos)

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta Stripe (para pagamentos)

## ⚙️ Configuração

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/doutor-agenda.git
cd doutor-agenda
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Preencha o arquivo .env com suas configurações:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/doutor-agenda

# Auth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=seu_stripe_publishable_key
STRIPE_SECRET_KEY=seu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=seu_stripe_webhook_secret
STRIPE_ESSENTIAL_PLAN_PRICE_ID=seu_stripe_price_id
```

5. Execute as migrações do banco de dados:

```bash
npm run db:migrate
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🌐 Estrutura do Projeto

```
src/
├── actions/          # Server Actions
├── app/             # App Router e páginas
├── components/      # Componentes React
├── db/             # Configuração do banco e schemas
├── helpers/        # Funções auxiliares
└── lib/            # Bibliotecas e configurações
```

## 📱 Páginas Principais

- `/` - Página inicial
- `/authentication` - Login/Registro
- `/dashboard` - Dashboard principal
- `/appointments` - Gestão de consultas
- `/doctors` - Gestão de médicos
- `/patients` - Gestão de pacientes
- `/subscription` - Gestão de assinatura

## 💳 Planos e Preços

### Plano Essential

- Até 3 médicos
- Agendamentos ilimitados
- Métricas básicas
- Cadastro de pacientes
- Confirmação manual
- Suporte via e-mail
- R$59/mês

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
