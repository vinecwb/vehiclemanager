# 🚗 Vehicle Manager App

Aplicativo mobile desenvolvido com **React Native CLI** para gerenciar o cadastro, listagem, edição, exclusão e filtragem de veículos, como parte da **Prova Substitutiva - Fase 4**.

## 📱 Funcionalidades

- ✅ Cadastro de veículos (Placa, Marca, Modelo, Ano, Cor)
- ✅ Listagem de veículos cadastrados
- ✅ Filtros por **marca** e **ano**
- ✅ Visualização detalhada de cada veículo
- ✅ Edição dos dados do veículo
- ✅ Exclusão de registros
- ✅ Validação de campos obrigatórios no formulário

## 🧪 Tecnologias utilizadas

- React Native CLI
- TypeScript
- React Navigation (Stack)
- Axios
- JSON Server (API simulada)

## 🧭 Navegação entre telas

Foi utilizada a biblioteca **React Navigation** com o `createNativeStackNavigator` para gerenciar as seguintes rotas:

- `HomeScreen`: listagem e filtros
- `AddVehicleScreen`: formulário de cadastro
- `VehicleDetailScreen`: detalhes de um veículo
- `EditVehicleScreen`: edição e exclusão

## 🧪 Validações

O formulário de cadastro e edição exige preenchimento obrigatório de todos os campos. Se algum campo estiver vazio, o app impede o envio e mostra um alerta.

## 🛠 Instalação e execução

### Pré-requisitos:

- Node.js
- React Native CLI
- Android Studio ou Xcode
- CocoaPods (para iOS)
- JSON Server

### Passos:

```bash
git clone https://github.com/seu-usuario/vehicle-manager.git
cd vehicle-manager
npm install
cd ios && pod install && cd ..
```

### Rodar a API Fake (JSON Server)

Crie o arquivo `db.json` com o conteúdo:

```json
{
  "vehicles": []
}
```

E inicie a API:

```bash
json-server --watch db.json --port 3000
```

### Executar no Android:

```bash
npx react-native run-android
```

### Executar no iOS:

```bash
npx react-native run-ios
```

## 🎥 Demonstração em vídeo

👉 [Clique aqui para assistir ao vídeo de apresentação](https://link-do-video.com)

---

## 📂 Estrutura de diretórios

```
src/
├── screens/
│   ├── HomeScreen.tsx
│   ├── AddVehicleScreen.tsx
│   ├── EditVehicleScreen.tsx
│   └── VehicleDetailScreen.tsx
├── services/
│   └── api.ts
App.tsx
```

## 🧑‍💻 Autor

**Vinicius Santos**
