# Documentação: Lógica de Precificação e Planos URBRASIL

Este documento detalha a lógica de cálculo aplicada aos planos de assinatura da URBRASIL, visando clareza para as equipes de suporte e TI.

## Premissas de Cálculo

Os preços foram definidos com base em duas frequências semanais, aplicando descontos progressivos para fidelização (LTV - Lifetime Value).

### 1. Frequência: 1x na Semana
*   **Mensal (Base):** R$ 130,00
*   **Plano 6 Meses (15% OFF):**
    *   Cálculo: (R$ 130 * 6) * 0,85 = R$ 663,00
    *   Economia: R$ 117,00
*   **Plano 1 Ano (30% OFF):**
    *   Cálculo: (R$ 130 * 12) * 0,70 = R$ 1.092,00
    *   Economia: R$ 468,00
    *   Equivalente Mensal: R$ 91,00

### 2. Frequência: 2x na Semana
*   **Mensal (Base):** R$ 160,00
*   **Plano 6 Meses (15% OFF):**
    *   Cálculo: (R$ 160 * 6) * 0,85 = R$ 816,00
    *   Economia: R$ 144,00
*   **Plano 1 Ano (30% OFF):**
    *   Cálculo: (R$ 160 * 12) * 0,70 = R$ 1.344,00
    *   Economia: R$ 576,00
    *   Equivalente Mensal: R$ 112,00

## Regras de Renovação e Suporte

1.  **Pagamento:** Os valores promocionais (6 meses e 1 ano) são calculados para pagamento à vista (Pix/Boleto).
2.  **Renovação:** Ao final do contrato, o plano é renovado automaticamente pelo valor vigente na tabela de preços da época, a menos que o aluno solicite o cancelamento com 30 dias de antecedência.
3.  **Suporte:** Em caso de dúvidas sobre valores ou necessidade de parcelamento diferenciado (cartão de crédito), o suporte deve consultar a tabela de "Preço Cartão" (que possui um acréscimo de aproximadamente 10% sobre o valor à vista para cobrir taxas).
