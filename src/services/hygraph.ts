import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://us-west-2.cdn.hygraph.com/content/cmmggjdrg00ip08wbze74zhtc/master';
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NzMyNTQ1ODMsImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21tZ2dqZHJnMDBpcDA4d2J6ZTc0emh0Yy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC11cy13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiNTE0YWVlNjktMzg2NC00NWFmLTkwMDYtMDY1YzUxMWY5ZjdiIiwianRpIjoiY21tbWR6dGpwMDJ0cTA3bGYzY2g0ZDg5YSJ9.YfSPNnk7UXawjBK8RKN1UsMk-Hckr0vXDFOaKDtXvtg5zDBsqcsbueZCyyz3AEmwhK_2J-3ouv_g-_snySQqcuyx1bQroZfX8ZPSufJX5CeWE4Gm5097jYSVXF3IscKNFQSfoA9qAMyxh9tzSTMGD4wAkswhisofmeiZ0Dt7N5_1ZN9XKpfoYPJZW3_RxrI0e8_oSeAFPlsx6Gd_EI4PNDZQygPh_pEaNNVkCcm5dlzSgG2ac7kjZG6AItvKyTazkuFDN6XSqTA1XtHG_G_pdB0hLGcUCEW9-TcglqRIVfEUx57xAc0kMnxXdP0Duvyb2wd6xIkwAO__M9zMszUBQCXPoJjZ-lqgWw0YyJOvLe78ehiq5vIcnTsYMHGmGkKMJ-v1R9wIjaT3QLxzZF_Y5vJ3CdJAenpj4jNZwg78KzBdqt9ImpKGrGAcRpD5eiu_Nv8xNVabEJel9ehf4e_sMYvRNCyvSxQGxFOT564T9y6QAJVNGDHiYoIFa2-wMt5cpT-M4JuA4xd8V8xhBneW0HeplfCNQtsd7dBmt_HWUtyV-f8Zkw50EN-BkulQhgymGYhXSAqIIB0vnM1Y-ASr5X7_MclxrexaU7biY0Yh6xRd7ZjFo-hbBb_n8UT16LE1-_cpNzQtU5h0NTH1gvjb6lmgjfYO_qTqQ9JlkRB_7LA';

export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const GET_POSTS = gql`
  query GetPosts {
    posts(orderBy: date_DESC) {
      id
      title
      slug
      descricao
      date
      categoria
      file {
        url
      }
    }
  }
`;

export interface Post {
  id: string;
  title: string;
  slug: string;
  descricao: string;
  date: string;
  categoria: string;
  file?: {
    url: string;
  };
}
