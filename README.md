# vue-spa

A full-featured full-stack .NET 10.0 + Vue Vite project template that combines the power of ServiceStack with Vue Vite static site generation and Vue 3. It provides a production-ready foundation for building scalable web applications with integrated authentication, database management, and background job processing.

![](https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/templates/vue-spa.webp)

> Browse [source code](https://github.com/NetCoreTemplates/vue-spa), view live demo [vue-spa.web-templates.io](http://vue-spa.web-templates.io) and install with:

## Quick Start

```bash
npx create-net vue-spa MyProject
```

## Jumpstart with Copilot

Instantly [scaffold a new App with this template](https://github.com/new?template_name=vue-spa&template_owner=NetCoreTemplates) using GitHub Copilot, just describe the features you want and watch Copilot build it!

## Getting Started

Run Server .NET Project (automatically starts both .NET and Vite Vue dev servers):

```bash
cd MyProject
dotnet watch
```

## Architecture

### Hybrid Development Approach

**Development Mode:**

![](https://raw.githubusercontent.com/ServiceStack/docs.servicestack.net/refs/heads/main/MyApp/wwwroot/img/pages/templates/info/vite-dev.svg)

- ASP.NET Core proxies requests to Vite dev server (running on port 5173)
- Hot Module Replacement (HMR) support for instant UI updates
- WebSocket proxying for Vite HMR functionality

**Production Mode:**

![](https://raw.githubusercontent.com/ServiceStack/docs.servicestack.net/refs/heads/main/MyApp/wwwroot/img/pages/templates/info/vite-prod.svg)

- Vite Vue app is statically exported to `/dist`
- Static files served directly from ASP.NET Core's `/wwwroot`
- No separate Node.js server required in production

## Core Technologies

### Frontend

- **Vue 3** - A JavaScript library for building user interfaces
- **Vite 7** - Next Generation Frontend Tooling
- **Tailwind CSS v4** - CSS-first configuration with `@tailwindcss/vite` plugin
- **TypeScript 5** - JavaScript with syntax for types
- **Vitest** - Modern testing framework
- **ServiceStack Vue Components** - Pre-built UI components

### .NET Frontend (Integrated + Optional)
- **Razor Pages** - For Identity Auth UI (`/Identity` routes)

### Backend (.NET 10.0)
- **ServiceStack 10.x** - High-performance web services framework
- **ASP.NET Core Identity** - Complete authentication & authorization system
- **OrmLite** - ServiceStack's fast, lightweight Typed ORM for application data
- **Entity Framework Core** - For Identity data management
- **SQLite** - Default database - [Upgrade to PostgreSQL/SQL Server/MySQL](#upgrading-to-enterprise-database)

## Major Features

### 🔐 Identity Authentication

Full ASP.NET Core Identity integration with ServiceStack's Auth features:

- **Credentials Authentication** - Email/password sign-in with secure cookie sessions
- **User Registration** - With email confirmation support
- **Role-based Authorization** - Admin, Manager, Employee roles with `[ValidateHasRole]`
- **Admin Users UI** - Built-in user management at `/admin-ui/users`
- **API Keys** - Generate and manage API keys for programmatic access

### 📊 [AutoQuery CRUD](#autoquery-crud-dev-workflow)
- **AutoQuery** - Queryable APIs with filtering, sorting, and pagination
- **AutoQueryData** - In-memory queryable data sources
- **Audit History** - Automatic tracking of data changes
- **Bookings Example** - Complete CRUD example with role-based permissions

### ⚙️ Background Jobs

Durable job processing with ServiceStack's Background Jobs:

- **Command Pattern** - Type-safe job definitions
- **Email Queue** - SMTP email sending via background jobs
- **Recurring Jobs** - Scheduled task execution
- **Job Dashboard** - Monitor jobs at `/admin-ui/jobs`
- Uses monthly rolling Sqlite databases by default - [Upgrade to PostgreSQL/SQL Server/MySQL](#upgrading-to-enterprise-database)

### 🤖 AI Chat Integration

Built-in AI chat capabilities:

- **ChatFeature** - Multi-provider AI chat API
- **Configurable Providers** - ServiceStack, OpenAI, Anthropic, Google, Groq, and more
- **Chat History** - Persistent storage with `DbChatStore`
- **Admin Analytics** - Chat usage insights at `/admin-ui/chat`

### 🗄️ Database

SQLite with dual ORM support:

- **OrmLite** - ServiceStack's fast micro-ORM for services
- **Entity Framework Core** - For Identity and complex queries
- **Code-First Migrations** - EF Core migrations in `/Migrations`
- **Database Admin UI** - Browse data at `/admin-ui/database`

### 📡 Request Logging

Comprehensive API logging:

- **SqliteRequestLogger** - Persistent request logging to SQLite
- **Request Body Tracking** - Full request payload capture
- **Error Tracking** - Automatic error logging
- **Admin Dashboard** - View logs at `/admin-ui/logging`

### 🏥 Health Checks

Production-ready health monitoring:

- **Health Endpoint** - `/up` for load balancer checks
- **Custom Health Checks** - Extensible health check framework

### 🔄 TypeScript DTOs

Automatic TypeScript type generation:

- **Type-Safe API Calls** - Generated from C# DTOs
- **Sync Command** - `npm run dtos` to update types
- **ServiceStack Client** - Full-featured TypeScript client

### 📖 OpenAPI & Swagger UI

API documentation with modern tooling:

- **.NET 10 OpenAPI** - Auto-generated API specifications
- **Swagger UI** - Interactive API documentation at `/swagger`
- **Development Mode** - API docs available in development

### 🐳 Docker Deployment

Production-ready containerization:

- **Kamal Deployment** - Zero-downtime deploys with Kamal
- **GitHub Container Registry** - Automatic container builds
- **SSL Auto-Certification** - Let's Encrypt integration
- **Volume Persistence** - `App_Data` volume mounting for SQLite

### 🌙 Dark Mode

Built-in theme support:

- **System Preference** - Respects OS dark mode setting
- **Tailwind CSS 4** - Native dark mode utilities
- **Consistent Theming** - All components support dark mode

## Example Pages

| Page               | Description |
|--------------------|-------------|
| `/`                | Home page with getting started guide |
| `/todomvc`         | TodoMVC example with ServiceStack APIs |
| `/bookings-auto`   | AutoQueryGrid with custom columns |
| `/bookings-data    | Custom CRUD DataGrid with custom Create and Edit Froms |
| `/weather`         | Auto and Custom DataGrids for displaying weather data |
| `/profile`         | Auth protected User profile page |
| `/blog`            | Markdown powered blog |
| `/whatsnew`        | Custom Markdown powered feature |
| `/about`           | About page (markdown) |
| `/privacy`         | Privacy policy page (markdown) |

## Project Structure

```
MyApp/                         # .NET Backend (hosts both .NET and Vite build output)
├── Configure.*.cs             # Modular startup configuration
├── Migrations/                # EF Core Identity migrations + OrmLite app migrations
├── Pages/                     # Identity Auth Razor Pages
└── wwwroot/                   # Production static files (from MyApp.Client/dist)

MyApp.Client/                  # Vue Frontend
├── src/
│   ├── pages/                 # File-based routing using unplugin-vue-router
│   ├── layouts/               # Layout components (default, admin, empty)
│   ├── components/            # Reusable Vue components
│   ├── stores/                # Pinia stores
├── assets/
│   ├── img/                   # App images
│   ├── styles/                # Tailwind CSS styles
├── dtos.ts                    # Auto-generated from C# (via `npm run dtos`)
└── vite.config.ts             # Vite configuration

MyApp.ServiceModel/            # DTOs & API contracts
├── *.cs                       # C# Request/Response DTOs
├── api.d.ts                   # TypeScript data models Schema
└── *.d.ts                     # TypeScript data models for okai code generation

MyApp.ServiceInterface/        # Service implementations
├── Data/                      # EF Core DbContext and Identity models
└── *Services.cs               # ServiceStack service implementations

MyApp.Tests/                   # .NET tests (NUnit)
├── IntegrationTest.cs         # API integration tests
└── MigrationTasks.cs          # Migration task runner

config/
└── deploy.yml                 # Kamal deployment settings
.github/
└── workflows/
    ├── build.yml              # CI build and test
    ├── build-container.yml    # Container image build
    └── release.yml            # Production deployment with Kamal
```

## Development Workflow

### 1. Start Development

```bash
dotnet watch
```

This automatically starts both .NET and Vite dev servers.

### 2. Generate TypeScript DTOs

After modifying C# service models, regenerate TypeScript dtos.ts in `MyApp` or `MyApp.Client` with:

```bash
npm run dtos
```

### 3. Database Migrations

**OrmLite and Entity Framework:**

```bash
npm run migrate
```

**OrmLite (for application data):**

Create migration classes in `MyApp/Migrations/` following the pattern in `Migration1000.cs`.

### 4. Testing

**Frontend:**
```bash
cd MyApp.Client
npm run test        # Run tests in watch mode
npm run test:ui     # Run tests with UI
npm run test:run    # Run tests once
```


## Configuration

### Key Configuration Files

- **MyApp/appsettings.json** - Application configuration
- **MyApp.Client/next.config.mjs** - Next.js configuration
- **MyApp.Client/styles/index.css** - Tailwind CSS configuration
- **config/deploy.yml** - Kamal deployment settings

### App Settings

Configure in `appsettings.json` or environment:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "DataSource=App_Data/app.db;Cache=Shared"
  },
  "SmtpConfig": {
    "Host": "smtp.example.com",
    "Port": 587,
    "FromEmail": "noreply@example.com",
    "FromName": "MyApp"
  },
  "AppConfig": {
    "BaseUrl": "https://myapp.example.com"
  }
}
```

### App Settings Secrets

Instead of polluting each GitHub Reposity with multiple App-specific GitHub Action Secrets, you can save all your secrets in a single `APPSETTINGS_PATCH` GitHub Action Secret to patch `appsettings.json` with environment-specific configuration using [JSON Patch](https://jsonpatch.com). E.g:

```json
[
    {
        "op":"replace",
        "path":"/ConnectionStrings/DefaultConnection",
        "value":"Server=service-postgres;Port=5432;User Id=dbuser;Password=dbpass;Database=dbname;Pooling=true;"
    },
    { "op":"add", "path":"/SmtpConfig", "value":{
        "UserName": "SmptUser",
        "Password": "SmptPass",
        "Host": "email-smtp.us-east-1.amazonaws.com",
        "Port": 587,
        "From": "noreply@example.org",
        "FromName": "MyApp",
        "Bcc": "copy@example.org"
      } 
    },
    { "op":"add", "path":"/Admins", "value": ["admin1@email.com","admin2@email.com"] },
    { "op":"add", "path":"/CorsFeature/allowOriginWhitelist/-", "value":"https://servicestack.net" }
]
```

### SMTP Email

Enable email sending by uncommenting in `Program.cs`:

```csharp
services.AddSingleton<IEmailSender<ApplicationUser>, EmailSender>();
```

## Upgrading to Enterprise Database

To switch from SQLite to PostgreSQL/SQL Server/MySQL:

1. Install preferred RDBMS (ef-postgres, ef-mysql, ef-sqlserver), e.g:

```bash
npx add-in ef-postgres
```

2. Install `db-identity` to use RDBMS `DatabaseJobsFeature` for background jobs and `DbRequestLogger` for Request Logs:

```bash
npx add-in db-identity
```

## AutoQuery CRUD Dev Workflow

For Rapid Development simple [TypeScript Data Models](https://docs.servicestack.net/autoquery/okai-models) can be used to generate C# AutoQuery APIs and DB Migrations.

### Cheat Sheet

### Create a new Table

Create a new Table use `init <Table>`, e.g:

```bash
npx okai init Table
```

This will generate an empty `MyApp.ServiceModel/<Table>.d.ts` file along with stub AutoQuery APIs and DB Migration implementations. 

### Use AI to generate the TypeScript Data Model

Or to get you started quickly you can also use AI to generate the initial TypeScript Data Model with:

```bash
npx okai "Table to store Customer Stripe Subscriptions"
```

This launches a TUI that invokes ServiceStack's okai API to fire multiple concurrent requests to frontier cloud 
and OSS models to generate the TypeScript Data Models required to implement this feature. 
You'll be able to browse and choose which of the AI Models you prefer which you can accept by pressing `a` 
to `(a) accept`. These are the data models [Claude Sonnet 4.5 generated](https://servicestack.net/text-to-blazor?id=1764337230546) for this prompt.

#### Regenerate AutoQuery APIs and DB Migrations

After modifying the `Table.d.ts` TypeScript Data Model to include the desired fields, re-run the `okai` tool to re-generate the AutoQuery APIs and DB Migrations:

```bash
npx okai Table.d.ts
```

> Command can be run anywhere within your Solution

After you're happy with your Data Model you can run DB Migrations to run the DB Migration and create your RDBMS Table:

```bash
npm run migrate
```

#### Making changes after first migration

If you want to make further changes to your Data Model, you can re-run the `okai` tool to update the AutoQuery APIs and DB Migrations, then run the `rerun:last` npm script to drop and re-run the last migration:

```bash
npm run rerun:last
```

#### Removing a Data Model and all generated code

If you changed your mind and want to get rid of the RDBMS Table you can revert the last migration:

```bash
npm run revert:last
```

Which will drop the table and then you can get rid of the AutoQuery APIs, DB Migrations and TypeScript Data model with:

```bash
npx okai rm Transaction.d.ts
```

## Deployment

### Docker + Kamal

This project includes GitHub Actions for CI/CD with automatic Docker image builds and production [deployment with Kamal](https://docs.servicestack.net/kamal-deploy). The `/config/deploy.yml` configuration is designed to be reusable across projects—it dynamically derives service names, image paths, and volume mounts from environment variables, so you only need to configure your server's IP and hostname using GitHub Action secrets.

### GitHub Action Secrets

**Required - App Specific*:

The only secret needed to be configured per Repository.

| Variable | Example | Description |
|----------|---------|-------------|
| `KAMAL_DEPLOY_HOST` | `example.org` | Hostname used for SSL certificate and Kamal proxy |

**Required** (Organization Secrets):

Other Required variables can be globally configured in your GitHub Organization or User secrets which will
enable deploying all your Repositories to the same server.

| Variable | Example  | Description |
|----------|----------|-------------|
| `KAMAL_DEPLOY_IP`   | `100.100.100.100` | IP address of the server to deploy to |
| `SSH_PRIVATE_KEY`   | `ssh-rsa ...`     | SSH private key to access the server |
| `LETSENCRYPT_EMAIL` | `me@example.org`  | Email for Let's Encrypt SSL certificate |

**Optional**:

| Variable | Example | Description |
|----------|---------|-------------|
| `SERVICESTACK_LICENSE` | `...` | ServiceStack license key |

**Inferred** (from GitHub Action context):

These are inferred from the GitHub Action context and don't need to be configured.

| Variable | Source | Description |
|----------|--------|-------------|
| `GITHUB_REPOSITORY` | `${{ github.repository }}` | e.g. `acme/example.org` - used for service name and image |
| `KAMAL_REGISTRY_USERNAME` | `${{ github.actor }}` | GitHub username for container registry |
| `KAMAL_REGISTRY_PASSWORD` | `${{ secrets.GITHUB_TOKEN }}` | GitHub token for container registry auth |

#### Features

- **Docker containerization** with optimized .NET images
- **SSL auto-certification** via Let's Encrypt
- **GitHub Container Registry** integration
- **Volume persistence** for App_Data including any SQLite database

## AI-Assisted Development with CLAUDE.md

As part of our objectives of improving developer experience and embracing modern AI-assisted development workflows - all new .NET SPA templates include a comprehensive `AGENTS.md` file designed to optimize AI-assisted development workflows.

### What is CLAUDE.md?

`CLAUDE.md` and [AGENTS.md](https://agents.md) onboards Claude (and other AI assistants) to your codebase by using a structured documentation file that provides it with complete context about your project's architecture, conventions, and technology choices. This enables more accurate code generation, better suggestions, and faster problem-solving.

### What's Included

Each template's `AGENTS.md` contains:

- **Project Architecture Overview** - Technology stack, design patterns, and key architectural decisions
- **Project Structure** - Gives Claude a map of the codebase
- **ServiceStack Conventions** - DTO patterns, Service implementation, AutoQuery, Authentication, and Validation
- **API Integration** - TypeScript DTO generation, API client usage, component patterns, and form handling
- **Database Patterns** - OrmLite setup, migrations, and data access patterns
- **Common Development Tasks** - Step-by-step guides for adding APIs, implementing features, and extending functionality
- **Testing & Deployment** - Test patterns and deployment workflows

### Extending with Project-Specific Details

The existing `CLAUDE.md` serves as a solid foundation, but for best results, you should extend it with project-specific details like the purpose of the project, key parts and features of the project and any unique conventions you've adopted.

### Benefits

- **Faster Onboarding** - New developers (and AI assistants) understand project conventions immediately
- **Consistent Code Generation** - AI tools generate code following your project's patterns
- **Better Context** - AI assistants can reference specific ServiceStack patterns and conventions
- **Reduced Errors** - Clear documentation of framework-specific conventions
- **Living Documentation** - Keep it updated as your project evolves

### How to Use

Claude Code and most AI Assistants already support automatically referencing `CLAUDE.md` and `AGENTS.md` files, for others you can just include it in your prompt context when asking for help, e.g:

> Using my project's AGENTS.md, can you help me add a new AutoQuery API for managing Products?

The AI will understand your App's ServiceStack conventions, React setup, and project structure, providing more accurate and contextual assistance.

## Ideal Use Cases

- SaaS applications requiring authentication
- Admin dashboards with CRUD operations
- Content-driven sites with dynamic APIs
- Applications needing background job processing
- Projects requiring both SSG benefits and API capabilities
- Teams wanting type-safety across full stack

## Learn More

- [.NET Vue Project Templates](https://docs.servicestack.net/templates/vue)
- [Vue Components](https://docs.servicestack.net/vue/)
- [ServiceStack Documentation](https://docs.servicestack.net)
- [Vite Documentation](https://vite.dev)
- [Vue Documentation](https://vuejs.org)
- [AutoQuery CRUD](https://docs.servicestack.net/autoquery/crud)
- [Background Jobs](https://docs.servicestack.net/kamal-deploy)
- [AI Chat API](https://docs.servicestack.net/ai-chat-api)
