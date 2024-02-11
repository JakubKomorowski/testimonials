import FormBuilderSidebar from "@/app/components/ui/nav/FormBuilderSidebar";
import FormBuilderSidebarRight from "@/app/components/ui/nav/FormBuilderSidebarRight";
import FormBuilderTopbar from "@/app/components/ui/nav/FormBuilderTopbar";

interface Props {
  params: { formId: string };
}

const FormBuilder = ({ params }: Props) => {
  return (
    <>
      <FormBuilderSidebar />
      <FormBuilderSidebarRight id={params.formId} />
      <FormBuilderTopbar />
      <div className="col-span-3 col-start-2 row-start-2">halo</div>
    </>
  );
};

export default FormBuilder;
