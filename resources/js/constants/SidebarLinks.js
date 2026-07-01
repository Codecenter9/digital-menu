import {
  LayoutDashboard,
  Bed,
  Users,
  UserCog,
  CreditCard,
  ShoppingCart,
  List,
} from "lucide-react";

const SidebarLinks = {
  admin: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Orders",
      icon: Bed,
      path: "/admin/order-management",
    },
    {
      title: "Payments",
      icon: CreditCard,
      path: "/admin/payment-management",
    },
    {
    title:"Menu Management",
          icon: ShoppingCart,
          submenu:[
    {
      title:"Menu Categories",
      path:"/admin/menu-categories"
    },
    {
      title:"Menu Items",
      path:"/admin/menu-items"
    },
    {
      title:"Menu Addons",
      path:"/admin/menu-addons"
    }
      ]
    },
    {
      title: "Staff Management",
      icon: Users,
      path: "/admin/staff-management",
    },
    {
      title: "Guest Management",
      icon: UserCog,
       path: "/admin/guest-management",
    },
  ],

  guest: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/guest/dashboard",
    },
    {
      title: "My Orders",
      icon: ShoppingCart,
      path: "/customer/orders",
    },
     {
    title:"Menus",
          icon: ShoppingCart,
          submenu:[
     {
      title:"Menu Items",
      path:"/admin/menu-items"
    },
    {
      title:"Menu Addons",
      path:"/admin/menu-addons"
    }
      ]
    },

    // sample
{
      title: "upload",
      icon: LayoutDashboard,
      path: "/guest/files/upload",
    },

  ],

  waiter: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/waiter/dashboard",
    },
    {
      title: "Orders",
      icon: List,
      path: "/waiter/orders",
    },
    {
      title: "Payments",
      icon: CreditCard,
      path: "/waiter/payments",
    },
    {
      title:"Menu",
      icon: ShoppingCart,
      path:"/waiter/menu-items",
    }
  ],
};

export default SidebarLinks;