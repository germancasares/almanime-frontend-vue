[TODO: Add stickers]

# Table of contents

  * [Add environment variables](#add-environment-variables)
  * [Configure the Docker Compose Override](#configure-the-docker-compose-override)
  * [[Optional] VSCode as a IDE](#optional-vscode-as-a-ide)
    * [Recommended plugins](#recommended-plugins)
    * [Setup VS Code for development in a container](#setup-vs-code-for-development-in-a-container)

# Add environment variables

Create a `.env` file with the following variables:
- VUE_APP_EMPTYURL=\<Base Url\> (Example: http://localhost:8080/)
- VUE_APP_APIBASEURL=\<Url of the Backend API\> (Example: https://localhost:433/api/v1)

# Configure the Docker Compose Override

Create a `docker-compose.override.yml` file with the following snippet:

  ```YAML
  version: '3.8'

  services:
    frontend:
      build:
        context: .
        target: 'develop-stage'
      environment:
        NODE_ENV: development
      ports:
        - 80:8080
        - 8000:8000
      volumes:
        - '.:/app:cached'
        - 'node_modules:/app/node_modules/'
      command: /bin/sh -c "npm install -g @vue/cli && vue ui --host 0.0.0.0""

  volumes:
    node_modules:
  ```

# [Optional] VSCode as a IDE

## Recommended plugins

- [CSharp2TS](https://marketplace.visualstudio.com/items?itemName=rafaelsalguero.csharp2ts) : Easily convert C# POCO classes into Typescript POCO classes. 
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) : Build, manage, and deploy containerized applications
- [Lyrics/Subtitles Support](https://marketplace.visualstudio.com/items?itemName=Aster.vscode-subtitles) : .ass/.sub syntax highlighting
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) : Use a Docker container as a full-featured development environment
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) : Vue tooling for VS Code

## Setup VS Code for development in a container

>  The Visual Studio Code Remote - Containers extension lets you use a Docker container as a full-featured development environment. It allows you to open any folder inside (or mounted into) a container and take advantage of Visual Studio Code's full feature set.

1. Create a .devcontainer folder on the root of the project
2. Create a `devcontainer.json` file with the following snippet:
    ```JSON5
    // For format details, see https://aka.ms/vscode-remote/devcontainer.json or this file's README at:
    // https://github.com/microsoft/vscode-dev-containers/tree/v0.134.1/containers/docker-existing-docker-compose
    // If you want to run as a non-root user in the container, see .devcontainer/docker-compose.yml.
    {
        "name": "Docker Compose",

        // Update the 'dockerComposeFile' list if you have more compose files or use different names.
        // The .devcontainer/docker-compose.yml file contains any overrides you need/want to make.
        "dockerComposeFile": [
            "..\\docker-compose.yml",
            "..\\docker-compose.override.yml"
        ],

        // The 'service' property is the name of the service for the container that VS Code should
        // use. Update this value and .devcontainer/docker-compose.yml to the real service name.
        "service": "frontend",

        // The optional 'workspaceFolder' property is the path VS Code should open by default when
        // connected. This is typically a file mount in .devcontainer/docker-compose.yml
        "workspaceFolder": "/app",

        // Set *default* container specific settings.json values on container create.
        "settings": {
            "terminal.integrated.shell.linux": null
        },

        // Add the IDs of extensions you want installed when the container is created.
        "extensions": []

        // Use 'forwardPorts' to make a list of ports inside the container available locally.
        // "forwardPorts": [],

        // Uncomment the next line if you want start specific services in your Docker Compose config.
        // "runServices": [],

        // Uncomment the next line if you want to keep your containers running after VS Code shuts down.
        // "shutdownAction": "none",

        // Uncomment the next line to run commands after the container is created - for example installing curl.
        // "postCreateCommand": "apt-get update && apt-get install -y curl",

        // Uncomment to connect as a non-root user if you've added one. See https://aka.ms/vscode-remote/containers/non-root.
        // "remoteUser": "vscode"
    }
    ```
4. Open the command palette (F1) or (Ctrl+Shift+P) and use `Remote-Containers: Reopen in Container` command.
5. Open http://localhost/ in your favorite browser.