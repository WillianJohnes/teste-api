Feature: Deletar dispositivo
  Scenario: Usuário deleta um dispositivo criado via API
    Given que eu tenha um dispositivo criado na API
    When eu deletar esse dispositivo
    Then o dispositivo deve ser removido com sucesso
