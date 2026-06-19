export type Lang = 'pt' | 'en'

export interface StepItem {
  title: string
  body: string
}

export interface Translations {
  hero: {
    tagline: string
    cta: string
  }
  about: {
    title: string
    body: string
  }
  howItWorks: {
    title: string
    privateNote: string
    steps: StepItem[]
  }
  rules: {
    title: string
    intro: string
    items: string[]
  }
  gallery: {
    title: string
    emptyTitle: string
    emptyBody: string
  }
  modal: {
    title: string
    subtitle: string
    fields: {
      name: string
      age: string
      location: string
      role: string
      roleOptions: { rider: string; passenger: string; supporter: string }
      motorcycle: string
      yearsRiding: string
      hasLicense: string
      hasLicenseOptions: { yes: string; no: string }
      howFound: string
      howFoundPlaceholder: string
      knowsSomeone: string
      knowsSomeonePlaceholder: string
      about: string
      aboutPlaceholder: string
      rulesAccept: string
    }
    privacyNote: string
    submit: string
    errors: {
      required: string
      ageInvalid: string
      rulesRequired: string
    }
  }
  closed: {
    title: string
    body: string
    note: string
    close: string
  }
  footer: {
    tagline: string
    copyright: string
  }
}

export const t: Record<Lang, Translations> = {
  pt: {
    hero: {
      tagline:
        'Mais do que um grupo de motas — uma família para cafés, voltas e bons momentos.',
      cta: 'Entrar na Família',
    },
    about: {
      title: 'Quem Somos',
      body: 'Walking Around nasceu da vontade de juntar pessoas que gostam de motas, boa companhia e momentos simples: uma volta, um café, um almoço, um jantar ou um convívio. À medida que o grupo cresce, queremos manter a essência de sempre: respeito, organização e espírito de família.',
    },
    howItWorks: {
      title: 'Como Funciona',
      privateNote:
        'Este é um grupo privado. Os pontos de encontro e detalhes das saídas são partilhados apenas internamente, após aprovação.',
      steps: [
        {
          title: 'Candidata-te',
          body: 'Preenche o formulário com os teus dados e uma breve apresentação.',
        },
        {
          title: 'Revisão',
          body: 'O administrador revê a candidatura e entra em contacto contigo.',
        },
        {
          title: 'Aprovação',
          body: 'Se aceite, recebes acesso ao grupo de WhatsApp e informações sobre as saídas.',
        },
        {
          title: 'Bem-vindo à família',
          body: 'Faz parte de uma comunidade que valoriza o respeito e os bons momentos juntos.',
        },
      ],
    },
    rules: {
      title: 'As Nossas Regras',
      intro:
        'Para manter a família unida e os momentos especiais, pedimos que todos respeitem estas orientações simples:',
      items: [
        'Respeita todos os membros, independentemente da experiência ou tipo de mota.',
        'Anda com segurança.',
        'Nada de comportamentos irresponsáveis ou perigosos.',
        'Sem drama, mantemos o ambiente positivo e acolhedor.',
        'Ouve e respeita os administradores do grupo.',
        'Contribui para o espírito de família que nos une.',
      ],
    },
    gallery: {
      title: 'Momentos',
      emptyTitle: 'As fotos estão a caminho',
      emptyBody: 'Os melhores momentos ainda estão por viver. Em breve aqui.',
    },
    modal: {
      title: 'Candidatura',
      subtitle: 'Conta-nos um pouco sobre ti.',
      fields: {
        name: 'Nome completo',
        age: 'Idade',
        location: 'Localização',
        role: 'Como participas?',
        roleOptions: {
          rider: 'Motociclista',
          passenger: 'Pendura',
          supporter: 'Apoiante',
        },
        motorcycle: 'Mota (marca e modelo)',
        yearsRiding: 'Anos de experiência',
        hasLicense: 'Tens carta de mota válida?',
        hasLicenseOptions: { yes: 'Sim', no: 'Não' },
        howFound: 'Como conheceste o Walking Around?',
        howFoundPlaceholder: 'Instagram, amigo, evento...',
        knowsSomeone: 'Conheces alguém no grupo? (opcional)',
        knowsSomeonePlaceholder: 'Nome do membro',
        about: 'Apresenta-te brevemente',
        aboutPlaceholder: 'Conta-nos um pouco sobre ti...',
        rulesAccept: 'Li e aceito as regras do grupo',
      },
      privacyNote:
        'A tua informação será usada apenas para rever a candidatura e entrar em contacto contigo sobre o Walking Around.',
      submit: 'Enviar via WhatsApp',
      errors: {
        required: 'Este campo é obrigatório.',
        ageInvalid: 'Idade inválida (deve ser entre 14 e 99).',
        rulesRequired: 'Tens de aceitar as regras para continuar.',
      },
    },
    closed: {
      title: 'Grupo Exclusivo',
      body: 'O Walking Around é um grupo pequeno e selecionado a dedo. Neste momento não estamos a aceitar novas candidaturas.',
      note: 'Se conheces alguém do grupo, pede que te apresentem.',
      close: 'Fechar',
    },
    footer: {
      tagline: 'We ride together • We\'re family',
      copyright: 'Walking Around. Todos os direitos reservados.',
    },
  },

  en: {
    hero: {
      tagline:
        'More than a motorcycle group — a family for rides, coffee stops, and good times.',
      cta: 'Enter the Family',
    },
    about: {
      title: 'Who We Are',
      body: 'Walking Around brings together people who enjoy motorcycles, good company, and simple moments: a ride, a coffee stop, lunch, dinner, or a casual meetup. As the group grows, we want to preserve the same spirit as always: respect, organisation, and a family feeling.',
    },
    howItWorks: {
      title: 'How It Works',
      privateNote:
        'This is a private group. Meeting points and ride details are shared internally only, after approval.',
      steps: [
        {
          title: 'Apply',
          body: 'Fill in the form with your details and a brief introduction about yourself.',
        },
        {
          title: 'Review',
          body: 'The admin reviews your application and will get in touch with you.',
        },
        {
          title: 'Approval',
          body: 'If accepted, you receive access to the WhatsApp group and ride details.',
        },
        {
          title: 'Welcome to the family',
          body: 'Join a community that values respect, organisation, and good moments together.',
        },
      ],
    },
    rules: {
      title: 'Our Rules',
      intro:
        'To keep the family together and the moments special, we ask everyone to follow these simple guidelines:',
      items: [
        'Respect all members, regardless of experience or type of motorcycle.',
        'Ride safely.',
        'No reckless or dangerous behaviour.',
        'No drama, we keep the atmosphere positive and welcoming.',
        'Listen to and respect the group admins.',
        'Help preserve the family spirit that brings us together.',
      ],
    },
    gallery: {
      title: 'Moments',
      emptyTitle: 'Photos are on the way',
      emptyBody: 'The best moments are yet to come. Check back soon.',
    },
    modal: {
      title: 'Application',
      subtitle: 'Tell us a bit about yourself.',
      fields: {
        name: 'Full name',
        age: 'Age',
        location: 'Location (city / region)',
        role: 'How do you participate?',
        roleOptions: {
          rider: 'Rider',
          passenger: 'Passenger',
          supporter: 'Supporter',
        },
        motorcycle: 'Motorcycle (make and model)',
        yearsRiding: 'Years of riding experience',
        hasLicense: 'Do you have a valid motorcycle licence?',
        hasLicenseOptions: { yes: 'Yes', no: 'No' },
        howFound: 'How did you find Walking Around?',
        howFoundPlaceholder: 'Instagram, a friend, an event...',
        knowsSomeone: 'Do you know anyone in the group? (optional)',
        knowsSomeonePlaceholder: 'Member name',
        about: 'Introduce yourself briefly',
        aboutPlaceholder: 'Tell us a bit about yourself...',
        rulesAccept: 'I have read and accept the group rules',
      },
      privacyNote:
        'Your information will only be used to review your application and contact you about Walking Around.',
      submit: 'Send via WhatsApp',
      errors: {
        required: 'This field is required.',
        ageInvalid: 'Invalid age (must be between 14 and 99).',
        rulesRequired: 'You must accept the rules to continue.',
      },
    },
    closed: {
      title: 'Exclusive Group',
      body: 'Walking Around is a small, handpicked group. We are not accepting new members at this time.',
      note: 'If you know someone in the group, ask them to introduce you.',
      close: 'Close',
    },
    footer: {
      tagline: 'We ride together • We\'re family',
      copyright: 'Walking Around. All rights reserved.',
    },
  },
}
