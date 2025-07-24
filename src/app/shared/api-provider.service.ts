import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiProviderService {
  news = {
    create: "news/create",
    read: "news/read",
    update: "news/update",
    delete: "news/delete",
    category: {
      create: "news/category/create",
      read: "news/category/read",
      update: "news/category/update",
      delete: "news/category/delete",
    },
    gallery: {
      create: "news/gallery/create",
      read: "news/gallery/read",
      update: "news/gallery/update",
      delete: "news/gallery/delete",
    },
    galleryFile: {
      create: "news/galleryFile/create",
      read: "news/galleryFile/read",
      update: "news/galleryFile/update",
      delete: "news/galleryFile/delete",
    },
  };

  workprocess = {
    create: "workprocess/create",
    read: "workprocess/read",
    update: "workprocess/update",
    delete: "workprocess/delete",
    category: {
      create: "workprocess/category/create",
      read: "workprocess/category/read",
      update: "workprocess/category/update",
      delete: "workprocess/category/delete",
    },
    gallery: {
      create: "workprocess/gallery/create",
      read: "workprocess/gallery/read",
      update: "workprocess/gallery/update",
      delete: "workprocess/gallery/delete",
    },
    galleryFile: {
      create: "workprocess/galleryFile/create",
      read: "workprocess/galleryFile/read",
      update: "workprocess/galleryFile/update",
      delete: "workprocess/galleryFile/delete",
    },
  };

  employee = {
    create: "employee/create",
    read: "employee/read",
    update: "employee/update",
    delete: "employee/delete",
    category: {
      create: "employee/category/create",
      read: "employee/category/read",
      update: "employee/category/update",
      delete: "employee/category/delete",
    },
    gallery: {
      create: "employee/gallery/create",
      read: "employee/gallery/read",
      update: "employee/gallery/update",
      delete: "employee/gallery/delete",
    },
    galleryFile: {
      create: "employee/galleryFile/create",
      read: "employee/galleryFile/read",
      update: "employee/galleryFile/update",
      delete: "employee/galleryFile/delete",
    },
  };

  product = {
    create: "product/create",
    read: "product/read",
    update: "product/update",
    delete: "product/delete",
    category: {
      create: "product/category/create",
      read: "product/category/read",
      update: "product/category/update",
      delete: "product/category/delete",
    },
    gallery: {
      create: "product/gallery/create",
      read: "product/gallery/read",
      update: "product/gallery/update",
      delete: "product/gallery/delete",
    },
    galleryFile: {
      create: "product/galleryFile/create",
      read: "product/galleryFile/read",
      update: "product/galleryFile/update",
      delete: "product/galleryFile/delete",
    },
  };

  portfolio = {
    create: "portfolio/create",
    read: "portfolio/read",
    update: "portfolio/update",
    delete: "portfolio/delete",
    category: {
      create: "portfolio/category/create",
      read: "portfolio/category/read",
      update: "portfolio/category/update",
      delete: "portfolio/category/delete",
    },
    gallery: {
      create: "portfolio/gallery/create",
      read: "portfolio/gallery/read",
      update: "portfolio/gallery/update",
      delete: "portfolio/gallery/delete",
    },
    galleryFile: {
      create: "portfolio/galleryFile/create",
      read: "portfolio/galleryFile/read",
      update: "portfolio/galleryFile/update",
      delete: "portfolio/galleryFile/delete",
    },
  };

  policyParty = {
    create: "policyParty/create",
    read: "policyParty/read",
    update: "policyParty/update",
    delete: "policyParty/delete",
    category: {
      create: "policyParty/category/create",
      read: "policyParty/category/read",
      update: "policyParty/category/update",
      delete: "policyParty/category/delete",
    },
    gallery: {
      create: "policyParty/gallery/create",
      read: "policyParty/gallery/read",
      update: "policyParty/gallery/update",
      delete: "policyParty/gallery/delete",
    },
    galleryFile: {
      create: "policyParty/galleryFile/create",
      read: "policyParty/galleryFile/read",
      update: "policyParty/galleryFile/update",
      delete: "policyParty/galleryFile/delete",
    },
  };

  certificate = {
    create: "certificate/create",
    read: "certificate/read",
    update: "certificate/update",
    delete: "certificate/delete",
    category: {
      create: "certificate/category/create",
      read: "certificate/category/read",
      update: "certificate/category/update",
      delete: "certificate/category/delete",
    },
    gallery: {
      create: "certificate/gallery/create",
      read: "certificate/gallery/read",
      update: "certificate/gallery/update",
      delete: "certificate/gallery/delete",
    },
    galleryFile: {
      create: "certificate/galleryFile/create",
      read: "certificate/galleryFile/read",
      update: "certificate/galleryFile/update",
      delete: "certificate/galleryFile/delete",
    },
  };

  seminar = {
    create: "seminar/create",
    read: "seminar/read",
    update: "seminar/update",
    delete: "seminar/delete",
    category: {
      create: "seminar/category/create",
      read: "seminar/category/read",
      update: "seminar/category/update",
      delete: "seminar/category/delete",
    },
    gallery: {
      create: "seminar/gallery/create",
      read: "seminar/gallery/read",
      update: "seminar/gallery/update",
      delete: "seminar/gallery/delete",
    },
    galleryFile: {
      create: "seminar/galleryFile/create",
      read: "seminar/galleryFile/read",
      update: "seminar/galleryFile/update",
      delete: "seminar/galleryFile/delete",
    },
  };

  imageEvent = {
    create: "imageEvent/create",
    read: "imageEvent/read",
    update: "imageEvent/update",
    delete: "imageEvent/delete",
    category: {
      create: "imageEvent/category/create",
      read: "imageEvent/category/read",
      update: "imageEvent/category/update",
      delete: "imageEvent/category/delete",
    },
    gallery: {
      create: "imageEvent/gallery/create",
      read: "imageEvent/gallery/read",
      update: "imageEvent/gallery/update",
      delete: "imageEvent/gallery/delete",
    },
    galleryFile: {
      create: "imageEvent/galleryFile/create",
      read: "imageEvent/galleryFile/read",
      update: "imageEvent/galleryFile/update",
      delete: "imageEvent/galleryFile/delete",
    },
  };

  eventAbroad = {
    create: "eventAbroad/create",
    read: "eventAbroad/read",
    update: "eventAbroad/update",
    delete: "eventAbroad/delete",
    category: {
      create: "eventAbroad/category/create",
      read: "eventAbroad/category/read",
      update: "eventAbroad/category/update",
      delete: "eventAbroad/category/delete",
    },
    gallery: {
      create: "eventAbroad/gallery/create",
      read: "eventAbroad/gallery/read",
      update: "eventAbroad/gallery/update",
      delete: "eventAbroad/gallery/delete",
    },
    galleryFile: {
      create: "eventAbroad/galleryFile/create",
      read: "eventAbroad/galleryFile/read",
      update: "eventAbroad/galleryFile/update",
      delete: "eventAbroad/galleryFile/delete",
    },
  };

  important = {
    create: "important/create",
    read: "important/read",
    update: "important/update",
    delete: "important/delete",
    category: {
      create: "important/category/create",
      read: "important/category/read",
      update: "important/category/update",
      delete: "important/category/delete",
    },
    gallery: {
      create: "important/gallery/create",
      read: "important/gallery/read",
      update: "important/gallery/update",
      delete: "important/gallery/delete",
    },
    galleryFile: {
      create: "important/galleryFile/create",
      read: "important/galleryFile/read",
      update: "important/galleryFile/update",
      delete: "important/galleryFile/delete",
    },
  };

  comingSoon = {
    create: "comingSoon/create",
    read: "comingSoon/read",
    update: "comingSoon/update",
    delete: "comingSoon/delete",
    category: {
      create: "comingSoon/category/create",
      read: "comingSoon/category/read",
      update: "comingSoon/category/update",
      delete: "comingSoon/category/delete",
    },
    gallery: {
      create: "comingSoon/gallery/create",
      read: "comingSoon/gallery/read",
      update: "comingSoon/gallery/update",
      delete: "comingSoon/gallery/delete",
    },
  };

  welfare = {
    create: "welfare/create",
    read: "welfare/read",
    update: "welfare/update",
    delete: "welfare/delete",
    category: {
      create: "welfare/category/create",
      read: "welfare/category/read",
      update: "welfare/category/update",
      delete: "welfare/category/delete",
    },
    gallery: {
      create: "welfare/gallery/create",
      read: "welfare/gallery/read",
      update: "welfare/gallery/update",
      delete: "welfare/gallery/delete",
    },
  };

  warning = {
    create: "warning/create",
    read: "warning/read",
    update: "warning/update",
    delete: "warning/delete",
    category: {
      create: "warning/category/create",
      read: "warning/category/read",
      update: "warning/category/update",
      delete: "warning/category/delete",
    },
    gallery: {
      create: "warning/gallery/create",
      read: "warning/gallery/read",
      update: "warning/gallery/update",
      delete: "warning/gallery/delete",
    },
  };

  fund = {
    create: "fund/create",
    read: "fund/read",
    update: "fund/update",
    delete: "fund/delete",
    category: {
      create: "fund/category/create",
      read: "fund/category/read",
      update: "fund/category/update",
      delete: "fund/category/delete",
    },
    gallery: {
      create: "fund/gallery/create",
      read: "fund/gallery/read",
      update: "fund/gallery/update",
      delete: "fund/gallery/delete",
    },
  };

  policy = {
    create: "policy/create",
    read: "policy/read",
    update: "policy/update",
    delete: "policy/delete",
    gallery: {
      create: "policy/gallery/create",
      read: "policy/gallery/read",
      update: "policy/gallery/update",
      delete: "policy/gallery/delete",
    },
  };

  swearWords = {
    create: "rude/create",
    read: "rude/read",
    update: "rude/update",
    delete: "rude/delete",
  };

  contentKeyword = {
    create: "contentKeyword/create",
    read: "contentKeyword/read",
    update: "contentKeyword/update",
    delete: "contentKeyword/delete",
  };

  constructor() {}
}
