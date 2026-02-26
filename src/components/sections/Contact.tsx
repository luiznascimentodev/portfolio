import { useLanguage } from "../../contexts/LanguageContext";

export const Contact = () => {
  const { t } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    "Olá! Vi seu portfólio e gostaria de conversar com você."
  );

  const contactInfo = [
    {
      label: t.contact.email,
      value: "luiznascdev@gmail.com",
      href: "mailto:luiznascdev@gmail.com",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: t.contact.phone,
      value: "+55 (41) 98482-1206",
      href: `https://wa.me/5541984821206?text=${whatsappMessage}`,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      label: t.contact.location,
      value: "Curitiba, Paraná, Brasil",
      href: null,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 tracking-tight">
          {t.contact.title}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-10">
          {t.contact.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info) => {
          const CardContent = (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-2xl text-primary dark:text-primary/90 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {info.icon}
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {info.label}
              </h3>
              <p className="text-base text-gray-800 dark:text-gray-200 font-medium break-all">
                {info.value}
              </p>
              {info.href && (
                <div className="mt-4 text-xs text-primary/70 dark:text-primary/60 flex items-center justify-center gap-1">
                  <span>
                    Clique para{" "}
                    {info.label === "Telefone"
                      ? "conversar"
                      : "entrar em contato"}
                  </span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </>
          );

          return info.href ? (
            <a
              key={info.label}
              href={info.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 backdrop-blur-sm rounded-2xl border-2 border-gray-200/50 dark:border-gray-800/50 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 text-center cursor-pointer"
            >
              {CardContent}
            </a>
          ) : (
            <div
              key={info.label}
              className="group p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 backdrop-blur-sm rounded-2xl border-2 border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 text-center"
            >
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};
