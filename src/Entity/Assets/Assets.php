<?php

namespace App\Entity\Assets;

use App\Entity\Restrictions\Groups;
use App\Entity\User;
use App\Repository\Assets\AssetsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use MeiliSearch\Bundle\Searchable;
use Symfony\Component\Serializer\Annotation\Groups as SerializerGroups;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Attribute\SerializedName;

#[ORM\Entity(repositoryClass: AssetsRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[Searchable(indexName: 'assets')]
class Assets
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[SerializerGroups(['api_v1_asset', 'api_v2_asset', 'api_adobe_plugin', 'api_adobe_plugin_detail'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[SerializerGroups(['api_v1_asset', 'api_v2_asset', 'api_adobe_plugin', 'api_adobe_plugin_detail'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[SerializerGroups(['api_v1_asset'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[SerializerGroups(['api_adobe_plugin', 'api_adobe_plugin_detail'])]
    private ?string $filePath = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[SerializerGroups(['api_v2_asset', 'api_adobe_plugin', 'api_adobe_plugin_detail'])]
    private ?string $thumbnailPath = null;

    #[ORM\Column(length: 255)]
    #[SerializerGroups(['api_v1_asset', 'api_v2_asset', 'api_adobe_plugin', 'api_adobe_plugin_detail'])]
    private ?string $mime_type = null;

    #[ORM\Column(type: Types::BIGINT)]
    #[SerializerGroups(['api_v1_asset', 'api_adobe_plugin_detail'])]
    private ?int $fileSize = null;

    #[ORM\Column(enumType: ColorSpaceEnum::class, options: ['default' => ColorSpaceEnum::RGB])]
    #[SerializerGroups(['api_v1_asset', 'api_adobe_plugin_detail'])]
    private ?ColorSpaceEnum $colorSpace = ColorSpaceEnum::RGB;

    #[ORM\Column(enumType: AssetStatusEnum::class, options: ['default' => AssetStatusEnum::ACTIVE])]
    private ?AssetStatusEnum $status = AssetStatusEnum::INACTIVE;

    #[ORM\Column(nullable: true)]
    #[SerializerGroups(['api_v1_asset'])]
    private ?\DateTimeImmutable $embargoDate = null;

    #[ORM\Column(nullable: true)]
    #[SerializerGroups(['api_v1_asset'])]
    private ?\DateTimeImmutable $expirationDate = null;

    #[ORM\Column]
    #[SerializerGroups(['api_v1_asset'])]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'assets')]
    #[Ignore]
    private Collection $similarAssets;

    /**
     * @var Collection<int, self>
     */
    #[ORM\ManyToMany(targetEntity: self::class, mappedBy: 'similarAssets')]
    #[Ignore]
    private Collection $assets;

    /**
     * @var Collection<int, ItemCodes>
     */
    #[ORM\ManyToMany(targetEntity: ItemCodes::class, inversedBy: 'assets')]
    #[Ignore]
    private Collection $itemCodes;

    /**
     * @var Collection<int, Brands>
     */
    #[ORM\ManyToMany(targetEntity: Brands::class, inversedBy: 'assets')]
    #[Ignore]
    private Collection $brand;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Ignore]
    private ?User $uploader = null;

    /**
     * @var Collection<int, Tags>
     */
    #[ORM\ManyToMany(targetEntity: Tags::class, inversedBy: 'assets')]
    #[Ignore]
    private Collection $tags;

    /**
     * @var Collection<int, Collections>
     */
    #[ORM\ManyToMany(targetEntity: Collections::class, inversedBy: 'assets')]
    #[Ignore]
    private Collection $collections;

    /**
     * @var Collection<int, Categories>
     */
    #[ORM\ManyToMany(targetEntity: Categories::class, inversedBy: 'assets')]
    #[Ignore]
    private Collection $categories;

    /**
     * @var Collection<int, Groups>
     */
    #[ORM\ManyToMany(targetEntity: Groups::class, mappedBy: 'assets')]
    #[Ignore]
    private Collection $restrictedGroups;

    #[ORM\Column(length: 255, unique: true, nullable: true)]
    private ?string $tusUploadKey = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'children')]
    #[ORM\JoinColumn(name: 'parent_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Ignore]
    private ?self $parent = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'parent')]
    #[Ignore]
    private Collection $children;

    #[ORM\Column(length: 50, nullable: true, enumType: AssetVersionTypeEnum::class)]
    private ?AssetVersionTypeEnum $assetVersionTypeEnum = null;

    public function __construct()
    {
        $this->similarAssets = new ArrayCollection();
        $this->assets = new ArrayCollection();
        $this->itemCodes = new ArrayCollection();
        $this->brand = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->collections = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->restrictedGroups = new ArrayCollection();
        $this->children = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getThumbnailPath(): ?string
    {
        return $this->thumbnailPath;
    }

    public function setThumbnailPath(?string $thumbnailPath): static
    {
        $this->thumbnailPath = $thumbnailPath;

        return $this;
    }

    public function getMimeType(): ?string
    {
        return $this->mime_type;
    }

    public function setMimeType(string $mime_type): static
    {
        $this->mime_type = $mime_type;

        return $this;
    }

    public function getFileSize(): ?int
    {
        return $this->fileSize;
    }

    public function setFileSize(int $fileSize): static
    {
        $this->fileSize = $fileSize;

        return $this;
    }

    public function getColorSpace(): ?ColorSpaceEnum
    {
        return $this->colorSpace;
    }

    public function setColorSpace(ColorSpaceEnum $colorSpace): static
    {
        $this->colorSpace = $colorSpace;

        return $this;
    }

    public function getStatus(): ?AssetStatusEnum
    {
        return $this->status;
    }

    public function setStatus(AssetStatusEnum $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getEmbargoDate(): ?\DateTimeImmutable
    {
        return $this->embargoDate;
    }

    public function setEmbargoDate(?\DateTimeImmutable $embargoDate): static
    {
        $this->embargoDate = $embargoDate;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeImmutable
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(?\DateTimeImmutable $expirationDate): static
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    #[ORM\PrePersist]
    public function setCreatedAtValue(): void
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    /**
     * @return Collection<int, self>
     */
    public function getSimilarAssets(): Collection
    {
        return $this->similarAssets;
    }

    public function addSimilarAsset(self $similarAsset): static
    {
        if (!$this->similarAssets->contains($similarAsset)) {
            $this->similarAssets->add($similarAsset);
        }

        return $this;
    }

    public function removeSimilarAsset(self $similarAsset): static
    {
        $this->similarAssets->removeElement($similarAsset);

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getAssets(): Collection
    {
        return $this->assets;
    }

    public function addAsset(self $asset): static
    {
        if (!$this->assets->contains($asset)) {
            $this->assets->add($asset);
            $asset->addSimilarAsset($this);
        }

        return $this;
    }

    public function removeAsset(self $asset): static
    {
        if ($this->assets->removeElement($asset)) {
            $asset->removeSimilarAsset($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, ItemCodes>
     */
    public function getItemCodes(): Collection
    {
        return $this->itemCodes;
    }

    public function addItemCode(ItemCodes $itemCode): static
    {
        if (!$this->itemCodes->contains($itemCode)) {
            $this->itemCodes->add($itemCode);
        }

        return $this;
    }

    public function removeItemCode(ItemCodes $itemCode): static
    {
        $this->itemCodes->removeElement($itemCode);

        return $this;
    }

    /**
     * @return Collection<int, Brands>
     */
    public function getBrand(): Collection
    {
        return $this->brand;
    }

    public function addBrand(Brands $brand): static
    {
        if (!$this->brand->contains($brand)) {
            $this->brand->add($brand);
        }

        return $this;
    }

    public function removeBrand(Brands $brand): static
    {
        $this->brand->removeElement($brand);

        return $this;
    }

    public function getUploader(): ?User
    {
        return $this->uploader;
    }

    public function setUploader(?User $uploader): static
    {
        $this->uploader = $uploader;

        return $this;
    }

    /**
     * @return Collection<int, Tags>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tags $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(Tags $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    /**
     * @return Collection<int, Collections>
     */
    public function getCollections(): Collection
    {
        return $this->collections;
    }

    public function addCollection(Collections $collection): static
    {
        if (!$this->collections->contains($collection)) {
            $this->collections->add($collection);
        }

        return $this;
    }

    public function removeCollection(Collections $collection): static
    {
        $this->collections->removeElement($collection);

        return $this;
    }

    /**
     * @return Collection<int, Categories>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Categories $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Categories $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    /**
     * @return Collection<int, Groups>
     */
    public function getRestrictedGroups(): Collection
    {
        return $this->restrictedGroups;
    }

    public function addRestrictedGroup(Groups $restrictedGroup): static
    {
        if (!$this->restrictedGroups->contains($restrictedGroup)) {
            $this->restrictedGroups->add($restrictedGroup);
            $restrictedGroup->addAsset($this);
        }

        return $this;
    }

    public function removeRestrictedGroup(Groups $restrictedGroup): static
    {
        if ($this->restrictedGroups->removeElement($restrictedGroup)) {
            $restrictedGroup->removeAsset($this);
        }

        return $this;
    }

    public function getTusUploadKey(): ?string
    {
        return $this->tusUploadKey;
    }

    public function setTusUploadKey(?string $tusUploadKey): static
    {
        $this->tusUploadKey = $tusUploadKey;

        return $this;
    }

    #[SerializerGroups(['searchable'])]
    public function getItemCodesForSearch(): array
    {
        return $this->itemCodes->map(fn(ItemCodes $item) => $item->getCode())->toArray();
    }

    #[SerializerGroups(['searchable'])]
    public function getBrandForSearch(): array
    {
        return $this->brand->map(fn(Brands $brand) => $brand->getName())->toArray();
    }

    #[SerializerGroups(['searchable'])]
    public function getCategoriesForSearch(): array
    {
        return $this->categories->map(fn(Categories $cat) => $cat->getName())->toArray();
    }

    #[SerializerGroups(['searchable'])]
    public function getCollectionsForSearch(): array
    {
        return $this->collections->map(fn(Collections $col) => $col->getName())->toArray();
    }

    #[SerializerGroups(['searchable'])]
    public function getTagsForSearch(): array
    {
        return $this->tags->map(fn(Tags $tag) => $tag->getName())->toArray();
    }

    /**
     * Get all parent brand IDs for Meilisearch indexing
     */
    #[SerializerGroups(['searchable'])]
    #[SerializedName('parent_brand_ids')]
    public function getParentBrandIds(): array
    {
        $parentBrandIds = [];

        foreach ($this->brand as $brand)
        {
            if ($parent = $brand->getBrands())
            {
                $parentBrandIds[] = $parent->getId();
            }
        }

        return array_unique($parentBrandIds);
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): static
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function addChild(self $child): static
    {
        if (!$this->children->contains($child)) {
            $this->children->add($child);
            $child->setParent($this);
        }

        return $this;
    }

    public function removeChild(self $child): static
    {
        if ($this->children->removeElement($child)) {
            // set the owning side to null (unless already changed)
            if ($child->getParent() === $this) {
                $child->setParent(null);
            }
        }

        return $this;
    }

    public function getAssetVersionTypeEnum(): ?AssetVersionTypeEnum
    {
        return $this->assetVersionTypeEnum;
    }

    public function setAssetVersionTypeEnum(?AssetVersionTypeEnum $assetVersionTypeEnum): static
    {
        $this->assetVersionTypeEnum = $assetVersionTypeEnum;

        return $this;
    }
}
