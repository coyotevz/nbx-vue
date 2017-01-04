<template>
  <div class="supplier-data">
    <md-layout :md-gutter="8">

      <md-layout v-if="supplier.notes" md-flex="50">
        <md-card class="notes">
          <md-card-header>
            <div class="md-title">Notas</div>
            <md-button class="md-icon-button edit md-dense">
              <md-icon>edit</md-icon>
            </md-button>
          </md-card-header>
          <md-card-content>{{ supplier.notes }}</md-card-content>
        </md-card>
      </md-layout>

      <md-layout md-flex="50" v-if="supplier.fiscal_data">
        <md-card>
          <md-card-header>
            <div class="md-title">Datos Fiscales</div>
            <md-button class="md-icon-button edit md-dense"><md-icon>edit</md-icon></md-button>
          </md-card-header>

          <md-card-content class="dl-horizontal">
            <dl v-if="supplier.fiscal_data.type">
              <dt>IVA</dt>
              <dd>{{ supplier.fiscal_data.type }}</dd>
            </dl>
            <dl v-if="supplier.fiscal_data.cuit">
              <dt>CUIT</dt>
              <dd>{{ supplier.fiscal_data.cuit }}</dd>
            </dl>
            <dl v-if="supplier.fiscal_data.iibb">
              <dt>Ingresos Brutos</dt>
              <dd>{{ supplier.fiscal_data.iibb }}</dd>
            </dl>
          </md-card-content>
        </md-card>
      </md-layout>

      <md-layout md-flex="50">
        <md-card>
          <md-card-header>
            <div class="md-title">Acuerdos</div>
            <md-button class="md-icon-button edit md-dense"><md-icon>edit</md-icon></md-button>
          </md-card-header>
          <md-card-content class="dl-horizontal">
            <dl v-if="supplier.leap_time">
              <dt>Tiempo de entrega</dt>
              <dd>{{ supplier.leap_time }} días</dd>
            </dl>
            <dl v-if="supplier.payment_term">
              <dt>Plazo de pago</dt>
              <dd>{{ supplier.payment_term }} días</dd>
            </dl>
            <dl>
              <dt>Entrega en domicilio</dt>
              <dd>{{ supplier.delivery_included ? 'Si' : 'No' }}</dd>
            </dl>
            <dl v-if="!supplier.delivery_included">
              <dt>Transporte</dt>
              <dd>Transporte elegido ...</dd>
            </dl>
          </md-card-content>
        </md-card>
      </md-layout>

      <md-layout md-flex="50">
        <md-card>
          <md-card-header>
            <div class="md-title">Contacto</div>
            <md-button class="md-icon-button edit md-dense"><md-icon>edit</md-icon></md-button>
          </md-card-header>
          <md-card-content>
            <md-list class="md-double-line md-dense">
              <template>
                <md-list-item>
                  <md-icon class="md-primary">email</md-icon>
                  <div class="md-list-text-container">
                    <span>email 1</span>
                    <span>email type</span>
                  </div>
                </md-list-item>
                <md-list-item class="md-inset">
                  <div class="md-list-text-container">
                    <span>email 2</span>
                    <span>email type</span>
                  </div>
                </md-list-item>
                <md-divider></md-divider>
              </template>
              <template>
                <md-list-item>
                  <md-icon class="md-primary">phone</md-icon>
                  <div class="md-list-text-container">
                    <span>phone number 1</span>
                    <span>phone type</span>
                  </div>
                </md-list-item>
                <md-list-item class="md-inset">
                  <div class="md-list-text-container">
                    <span>phone number 2</span>
                    <span>phone type</span>
                  </div>
                </md-list-item>
                <md-divider></md-divider>
              </template>
              <md-list-item v-if="supplier.web">
                <md-icon class="md-primary">language</md-icon>
                <div class="md-list-text-container">
                  <span>{{ supplier.web }}</span>
                </div>
                <md-divider></md-divider>
              </md-list-item>
              <template v-if="supplier.address.length">
                <md-list-item>
                  <md-icon class="md-primary">place</md-icon>
                  <div class="md-list-text-container">
                    <span>{{ supplier.address[0].street }} {{ supplier.address[0].streetnumber }}</span>
                    <span>{{ supplier.address[0].address_type }}</span>
                  </div>
                </md-list-item>
              </template>
            </md-list>
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'supplier-data',
  computed: mapGetters({
    supplier: 'getCurrentSupplier'
  })
}
</script>

<style lang="scss">
.supplier-data {
  padding-top: 25px;

  .notes {
    .md-card-content {
      white-space: pre-wrap;
    }
  }

  .md-card {
    width: 100%;
    margin: 0 4px 16px;

    .md-card-header {
      display: flex;
      .md-title {
        flex: 1;
        font-size: 16px;
        line-height: 20px;
        margin-top: 0 !important;
        font-weight: bold;
      }
      .md-button.md-icon-button {
        line-height: 20px;
        margin-top: -8px;
        i {
          font-size: 20px;
          width: 20px;
          min-width: 20px;
          height: 20px;
          min-height: 20px;
        }
      }
    }
  }
}
</style>
